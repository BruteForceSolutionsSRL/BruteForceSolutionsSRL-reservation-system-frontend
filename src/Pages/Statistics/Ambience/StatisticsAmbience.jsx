import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar"; // npm add primereact
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { MultiSelect } from "primereact/multiselect";
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"; // npm install --save chart.js react-chartjs-2

import { Line } from "react-chartjs-2";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./StatisticsAmbience.css";
import StatisticsElement from "./StatisticsElement";

ChartJS.register(
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

export default function StatisticsAmbience() {
  const [date1, setDate1] = useState(null);
  const [date2, setDate2] = useState(null);
  const [dates, setDates] = useState(null);
  const [selectedCities, setSelectedCities] = useState(null);

  const [pendingData, setPendingData] = useState([]);
  const [aceptedData, setAceptedData] = useState([]);
  const [cancelData, setCancelData] = useState([]);
  const [rejectData, setRejectData] = useState([]);

  const cities = [
    { id: "1", name: "opcion 1" },
    { id: "2", name: "opcion 2" },
    { id: "3", name: "opcion 3" },
    { id: "4", name: "opcion 4" },
    { id: "5", name: "opcion 5" },
  ];

  const dataTable = [
    { motivo: "Examen", cant: 28, cantEst: 200 },
    { motivo: "Clases", cant: 12, cantEst: 100 },
    { motivo: "Otro", cant: 15, cantEst: 50 },
    { motivo: "Otro mas", cant: 22, cantEst: 20 },
    { motivo: "Otro mas", cant: 22, cantEst: 20 },
    { motivo: "Otro mas", cant: 22, cantEst: 20 },
    { motivo: "Otro mas", cant: 22, cantEst: 20 },
    { motivo: "Otro mas", cant: 22, cantEst: 20 },
    { motivo: "Otro mas", cant: 22, cantEst: 20 },
    { motivo: "Otro mas", cant: 22, cantEst: 20 },
    { motivo: "Otro mas", cant: 22, cantEst: 20 },
    { motivo: "Otro mas", cant: 22, cantEst: 20 },
  ];

  const handleSelector = (event) => {
    const value = event.value;
    setSelectedCities(value);
    console.log(value);
    logAll();
  };

  const handleCalendar = (event) => {
    setDates(event.value);
    // const formated = event.value.map((date) => {
    //   return date?.toISOString().split("T")[0];
    // });
    // setDates(formated);
  };

  const logAll = () => {
    console.log("Datos", date1, date2, dates, selectedCities);
  };

  const handleRange = () => {
    logAll();
  };

  // Fechas de inicio y fin para las etiquetas
  const fechaInicio = "2024-03-01";
  const fechaFin = "2024-03-10";

  // Generar etiquetas de fechas

  const [etiquetas, setEtiquetas] = useState(null);
  useEffect(() => {
    // setEtiquetas(generarEtiquetasDeFechas(fechaInicio, fechaFin));
    setEtiquetas(generarEtiquetasDeFechasDiarias(fechaInicio, fechaFin));
    setAceptedData([65, 59, 80, 81, 56, 55, 40]);
    setCancelData([28, 48, 40, 19, 86, 27, 90]);
    setRejectData([18, 38, 40, 50, 86, 27, 30]);
    setPendingData([18, 38, 40, 50, 86, 27, 30]);
  }, []);

  // Función para generar etiquetas de fechas dinámicamente
  // const generarEtiquetasDeFechas = (fechaInicio, fechaFin) => {
  //   const etiquetas = [];
  //   let fechaActual = new Date(fechaInicio);

  //   while (fechaActual <= new Date(fechaFin)) {
  //     const mes = fechaActual.toLocaleString("default", { month: "long" });
  //     const año = fechaActual.getFullYear();
  //     etiquetas.push(`${mes} ${año}`);
  //     fechaActual.setMonth(fechaActual.getMonth() + 1);
  //   }

  //   return etiquetas;
  // };

  const generarEtiquetasDeFechasDiarias = (fechaInicio, fechaFin) => {
    const etiquetas = [];
    let fechaActual = new Date(fechaInicio);

    while (fechaActual <= new Date(fechaFin)) {
      const dia = fechaActual.getDate().toString().padStart(1, "0");
      const mes = (fechaActual.getMonth() + 1).toString().padStart(2, "0");
      const año = fechaActual.getFullYear();
      etiquetas.push(`${año}/${mes}/${dia}`);
      fechaActual.setDate(fechaActual.getDate() + 1);
    }
    console.log(etiquetas);
    return etiquetas;
  };

  // Datos del gráfico de línea
  const dataLine = {
    // labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio"],
    labels: etiquetas,
    datasets: [
      {
        label: "Aceptados",
        data: aceptedData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        // yAxisID: "y",
      },
      {
        label: "Cancelados",
        data: cancelData,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        // yAxisID: "y1",
      },
      {
        label: "Rechazados",
        data: rejectData,
        borderColor: "rgba(54, 500, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        // yAxisID: "y2",
      },
      {
        label: "Pendientes",
        data: pendingData,
        borderColor: "rgba(300, 100, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        // yAxisID: "y3",
      },
    ],
  };

  // Configuración del gráfico de línea
  const optionsLine = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Reservas realizadas por fecha",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };
  const elementsList = [
    {
      classroom_id: 1,
      classroom_name: "LABORATORIO DE COMPUTO 1",
      classroom_type_id: 1,
      classroom_type_name: "LABORATORIO",
      classroom_status_id: 1,
      classroom_status_name: "HABILITADO",
      capacity: 50,
      floor: 0,
      block_id: 1,
      block_name: "AULAS INF-LAB",
    },
    {
      classroom_id: 2,
      classroom_name: "LABORATORIO DE COMPUTO 2",
      classroom_type_id: 1,
      classroom_type_name: "LABORATORIO",
      classroom_status_id: 1,
      classroom_status_name: "HABILITADO",
      capacity: 50,
      floor: 0,
      block_id: 1,
      block_name: "AULAS INF-LAB",
    },
    {
      classroom_id: 3,
      classroom_name: "LABORATORIO DE REDES",
      classroom_type_id: 1,
      classroom_type_name: "LABORATORIO",
      classroom_status_id: 1,
      classroom_status_name: "HABILITADO",
      capacity: 25,
      floor: 0,
      block_id: 1,
      block_name: "AULAS INF-LAB",
    },
    {
      classroom_id: 4,
      classroom_name: "LABORATORIO DE DESARROLLO",
      classroom_type_id: 1,
      classroom_type_name: "LABORATORIO",
      classroom_status_id: 1,
      classroom_status_name: "HABILITADO",
      capacity: 25,
      floor: 0,
      block_id: 1,
      block_name: "AULAS INF-LAB",
    },
    {
      classroom_id: 5,
      classroom_name: "LABORATORIO DE MANTENIMIENTO",
      classroom_type_id: 1,
      classroom_type_name: "LABORATORIO",
      classroom_status_id: 1,
      classroom_status_name: "HABILITADO",
      capacity: 50,
      floor: 0,
      block_id: 1,
      block_name: "AULAS INF-LAB",
    },
    {
      classroom_id: 6,
      classroom_name: "LABORATORIO DE COMPUTO 3",
      classroom_type_id: 1,
      classroom_type_name: "LABORATORIO",
      classroom_status_id: 1,
      classroom_status_name: "HABILITADO",
      capacity: 50,
      floor: 2,
      block_id: 2,
      block_name: "EDIFICIO MEMI",
    },
  ];

  return (
    <div>
      <div>
        <h1 className="text-center mb-4">Estadísticas de ambiente</h1>
      </div>
      <div className="pt-2">
        {elementsList?.map((each) => {
          return (
            <div key={each.classroom_id}>
              <StatisticsElement {...each} optionsLine={optionsLine} />
            </div>
          );
        })}
      </div>

      <div className="search-cotainer mb-4">buscador</div>
    </div>
  );
}
