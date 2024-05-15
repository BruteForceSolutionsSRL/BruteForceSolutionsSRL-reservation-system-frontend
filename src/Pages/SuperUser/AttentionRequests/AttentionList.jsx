import { useEffect, useState } from "react";
// Bootstrap and css imports
import Spinner from "react-bootstrap/Spinner";
import AttentionRequest from "./AttentionRequest";

export default function AttentionList() {
  const URL = import.meta.env.VITE_REACT_API_URL;

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setLoading(true);
    reloadListt();
  }, [reload]);

  const reloadListt = async () => {
    const fetchData = await fetch(URL + "pending-requests")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok.");
        return res.json();
      })
      .then((data) => {
        setReservations(data);
        setLoading(false);
        setReload(false);
      })
      .catch((err) => {
        if (err) throw console.error(err);
      });
    return fetchData;
  };

  return (
    <>
      <div>
        <h1 className="text-center">Atender solicitudes pendientes</h1>
      </div>
      {loading === true ? (
        <div className="text-center">
          <Spinner animation="border" variant="secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : reservations.length === 0 ? (
        <h1 className="text-center">
          No tienes mas solicitudes pendientes por atender
        </h1>
      ) : (
        <>
          <div className="container overflow-x-scroll text-center">
            <div className="row" style={{ minWidth: "470px" }}>
              <div className="col-1">
                <i>ID</i>
              </div>
              <div className="col-2">
                <i>Materia(s)</i>
              </div>
              <div className="col-2">
                <i>Cantidad de estudiantes</i>
              </div>
              <div className="col-2">
                <i>Fecha de reserva</i>
              </div>
              <div className="col-3">
                <i>Periodos</i>
              </div>
              <div className="col-2"></div>
            </div>
            <div className="">
              {reservations.map((element) => {
                return (
                  <div key={element.reservation_id} className="">
                    <AttentionRequest
                      {...element}
                      reload={(change) => setReload(change)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}