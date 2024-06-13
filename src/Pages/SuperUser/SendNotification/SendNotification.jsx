import { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import Select from "react-select";
import { getTeachers } from "../../../services/teachers";
import { Spinner } from "react-bootstrap";

export default function SendNotification() {
  const [notificateTo, setNotificateTo] = useState([]);
  const [title, setTitle] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [body, setBody] = useState("");
  const [listTeachers, setListTeachers] = useState([]);
  const [enableButton, setEnableButton] = useState(false);
  const [errorTitle, setErrorTitle] = useState({});
  const [errorNotificationType, setErrorNotificationType] = useState({});
  const [errorNotificateTo, setErrorNotificateTo] = useState({});
  const [errorBody, setErrorBody] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [loadingRequest, setLoadingSendRequest] = useState(false);

  useEffect(() => {
    getTeachersList();
  }, []);

  useEffect(() => {
    isFormCompleted();
  }, [title, notificationType, body, notificateTo]);

  const getTeachersList = async () => {
    let response = await getTeachers();
    if (response.status >= 200 && response.status < 300) {
      let teachers = response.data.map((person) => {
        return {
          value: person.person_id,
          label: person.person_fullname,
        };
      });
      setListTeachers(teachers);
    } else if (response.status >= 300 && response.status < 400) {
      console.log(response);
      setListTeachers(response.data);
    } else if (response.status >= 400 && response.status < 500) {
      console.log(response);
      setListTeachers(response.data);
    } else if (response.status >= 500) {
      console.log(response);
      setListTeachers(response.data);
    }
  };

  const isFormCompleted = () => {
    if (
      !title.trim() ||
      !notificationType.trim() ||
      notificateTo.length === 0 ||
      !body.trim()
    ) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  };

  const handleOnChangeTitle = (event) => {
    let { value } = event.target;
    setTitle(value);

    if (!value.trim()) {
      setErrorTitle({
        invalid: true,
        message: "Ingrese el titulo de la notificacion.",
      });
    } else {
      setErrorTitle({
        invalid: false,
        message: "",
      });
    }
  };

  const handleOnChangeNotificationType = (event) => {
    let { value } = event.target;
    setNotificationType(value);

    if (!value.trim()) {
      setErrorNotificationType({
        invalid: true,
        message: "Seleccione un tipo de notificacion",
      });
    } else {
      setErrorNotificationType({
        invalid: false,
        message: "",
      });
    }
  };

  const handleChangeNotificateTo = (event) => {
    setNotificateTo(event);

    if (event.length === 0) {
      setErrorNotificateTo({
        invalid: true,
        message: "Seleccione una opcion.",
      });
    } else {
      setErrorNotificateTo({
        invalid: false,
        message: "",
      });
    }
  };

  const handleChangeBody = (event) => {
    let { value } = event.target;
    setBody(value);

    if (!value.trim()) {
      setErrorBody({
        invalid: true,
        message: "Ingrese el contenido de la notificacion",
      });
    } else {
      setErrorBody({
        invalid: false,
        message: "",
      });
    }
  };
  const handleClickSend = () => {
    const content = {
      title: "Confirmacion",
      body: "¿Está seguro de realizar el envío de la notificación?",
    };
    setModalContent(content);
    setShowModal(true);
  };

  const handleClickAcceptCloseModal = () => {
    const content = {
      title: "",
      body: "",
    };
    setShowModal(false);
    setModalContent(content);
    setInitialStateFields();
  };

  const setInitialStateFields = () => {
    setNotificateTo([]);
    setTitle("");
    setNotificationType("");
    setBody("");
    setEnableButton(false);
    setErrorTitle({});
    setErrorNotificationType({});
    setErrorNotificateTo({});
    setErrorBody({});
    setModalContent({});
    setLoadingSendRequest(false);
  };
  const handleSubmit = async () => {
    setLoadingSendRequest(true);
    let response = await getTeachers().finally(() =>
      setLoadingSendRequest(false)
    ); //Cambiar funcion
    console.log(response);

    // Terminar con los mensajes de error y etcetera.
    let content = {};
    if (response.status >= 200 && response.status < 300) {
      content = { title: "Exito", body: response.data.message };
      setModalContent(content);
    } else if (response.status >= 300 && response.status < 400) {
      content = { title: "Error", body: response.data.message };
      setModalContent(content);
    } else if (response.status >= 400 && response.status < 500) {
      content = { title: "Error", body: response.data.message };
      setModalContent(content);
    } else if (response.status >= 500) {
      content = {
        title: "Error",
        body: "Ocurrio un error inesperado, intentelo nuevamente mas tarde.",
      };
      setModalContent(content);
    }
  };

  return (
    <div className="container">
      <div className="text-center pb-3">
        <h1>Crear notificación</h1>
      </div>
      <div>
        <Form>
          <div className="row">
            <div className="col-md-7">
              <div className="d-flex justify-content-between">
                <div>
                  <b className="pe-2">TITULO: </b>
                </div>
                <div className="w-100">
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={handleOnChangeTitle}
                    isInvalid={errorTitle.invalid}
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    {errorTitle.message}
                  </Form.Control.Feedback>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="d-flex justify-content-between align-items-center">
                <div className="">
                  <b className="">TIPO DE NOTIFICACION</b>
                </div>
                <div className="w-100">
                  <Form.Select
                    value={notificationType}
                    onChange={handleOnChangeNotificationType}
                    isInvalid={errorNotificationType.invalid}
                  >
                    <option value="">Seleccione una opcion</option>
                    <option value="1">Informativo</option>
                    <option value="2">Rechazado</option>
                    <option value="3">Advertencia</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errorNotificationType.message}
                  </Form.Control.Feedback>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between pt-3">
            <b className="pe-3">PARA: </b>
            <div className="w-100">
              <Select
                closeMenuOnSelect={false}
                isMulti
                options={listTeachers}
                className={`${
                  errorNotificateTo.invalid && "border border-danger"
                }`}
                onChange={handleChangeNotificateTo}
                value={notificateTo}
                noOptionsMessage={() =>
                  "Todas las opciones fueron seleccionadas"
                }
                placeholder="Enviar a..."
              />

              {errorNotificateTo.invalid && (
                <div className="d-block invalid-feedback">
                  {errorNotificateTo.message}
                </div>
              )}
            </div>
          </div>
          <div>
            <b>CONTENIDO:</b>
            <Form.Control
              as="textarea"
              rows={10}
              className="mt-3"
              placeholder="Ingrese el mensaje a transmitir para la notificacion."
              value={body}
              onChange={handleChangeBody}
              isInvalid={errorBody.invalid}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errorBody.message}
            </Form.Control.Feedback>
          </div>
          <div className="d-flex justify-content-end pt-3">
            <button
              className="btn btn-outline-success"
              disabled={enableButton}
              type="button"
              onClick={handleClickSend}
            >
              Enviar
            </button>
          </div>
        </Form>
      </div>

      <Modal show={showModal} centered backdrop>
        <Modal.Title className="p-3">{modalContent.title}</Modal.Title>
        <Modal.Body>
          <div>
            <label>{modalContent.body}</label>
          </div>
          <div className="d-flex justify-content-end pt-3">
            {modalContent.title !== "Confirmacion" ? (
              <>
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleClickAcceptCloseModal}
                >
                  Aceptar
                </button>
              </>
            ) : (
              <>
                {loadingRequest && (
                  <div className="p-2">
                    <Spinner
                      animation="border"
                      variant="secondary"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  </div>
                )}
                <button
                  className="btn btn-outline-secondary m-2"
                  onClick={() => setShowModal(false)}
                  disabled={loadingRequest}
                >
                  Cancelar
                </button>
                <button
                  className="btn btn-outline-success m-2"
                  onClick={handleSubmit}
                  disabled={loadingRequest}
                >
                  Aceptar
                </button>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}