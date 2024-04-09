import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./TimePicker.css";

function TimePicker({ onTimeChange }) {
  const [startHour, setStartHour] = useState("");
  const [endHour, setEndHour] = useState("");
  const [error, setError] = useState("");

  //forma de recibir desde el back
  const hoursOptions = [
    { id: 0, time: "Selecciona una hora" },
    { id: 1, time: "06:45" },
    { id: 2, time: "08:15" },
    { id: 3, time: "09:45" },
    { id: 4, time: "11:15" },
    { id: 5, time: "12:45" },
    { id: 6, time: "14:15" },
    { id: 7, time: "15:45" },
    { id: 8, time: "17:15" },
    { id: 9, time: "18:45" },
    { id: 10, time: "20:15" },
    { id: 11, time: "21:45" },
  ];

  const handleStartHourChange = (e) => {
    const newStartHour = e.target.value;
    const selectedStart = hoursOptions.find(
      (option) => option.time === newStartHour
    );
    const maxEndHourIndex = hoursOptions.findIndex(
      (option) => option.id === selectedStart.id + 2
    );
    if (endHour !== "" && newStartHour >= endHour) {
      setEndHour("");
    }
    setStartHour(newStartHour);
    if (endHour !== "" && endHour > hoursOptions[maxEndHourIndex].time) {
      setEndHour(hoursOptions[maxEndHourIndex].time);
      // lógica para validar y actualizar la hora de inicio
      onTimeChange({ startHour: newStartHour, endHour });
    }
    if (endHour !== "" && newStartHour > endHour) {
      setEndHour("");
      // lógica para validar y actualizar la hora de inicio
      onTimeChange({ startHour: newStartHour, endHour });
    }
    setError(
      newStartHour && endHour
        ? ""
        : "Both start and end hours must be selected."
    );
    //console.log("Hora inicial seleccionada:", newStartHour);
  };

  const handleEndHourChange = (e) => {
    const selectedStart = hoursOptions.find(
      (option) => option.time === startHour
    );
    const selectedEndHour = hoursOptions.find(
      (option) => option.time === e.target.value
    );
    if (selectedEndHour && selectedEndHour.id <= selectedStart.id + 2) {
      setEndHour(e.target.value);
      setError("");
      // lógica para validar y actualizar la hora de fin
      onTimeChange({ startHour, endHour: e.target.value });
    } else {
      setEndHour("");
      setError(
        "The schedule exceeds the reservation period permitided(Maximum 4 periods)."
      );
    }
    //console.log("Hora final seleccionada:", e.target.value);
  };

  useEffect(() => {
    // Aquí puedes hacer lo que necesites con las horas seleccionadas, como enviarlas al backend
    console.log("Periodo:", startHour, "-", endHour);
  }, [startHour, endHour]);

  return (
    <div>
      <Row className="justify-content-center d-flex">
        <Col xs="auto">
          <Form.Label>Hora inicial:</Form.Label>
          <Form.Control
            className="time-pickerStart"
            as="select"
            value={startHour}
            onChange={handleStartHourChange}
          >
            {hoursOptions.map((option) => (
              <option key={option.id} value={option.time}>
                {`${option.time}`}
              </option>
            ))}
          </Form.Control>
        </Col>
        <Col xs="auto">
          <Form.Label>Hora final:</Form.Label>
          <Form.Control
            className="time-pickerEnd"
            as="select"
            value={endHour}
            onChange={handleEndHourChange}
          >
            {hoursOptions
              .filter((option) => option.time > startHour)
              .map((option) => (
                <option key={option.id} value={option.time}>
                  {`${option.time}`}
                </option>
              ))}
          </Form.Control>
        </Col>
      </Row>
      {error && <div className="text-danger mt-2">{error}</div>}
    </div>
  );
}

export default TimePicker;