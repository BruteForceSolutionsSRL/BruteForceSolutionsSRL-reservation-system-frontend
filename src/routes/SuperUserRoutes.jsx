import { Routes, Route } from "react-router-dom";
import Sidebar from "../Components/Sidebar.jsx/Sidebar";
import Homepage from "../Pages/User/Homepage/Homepage";
import Disponibility from "../Pages/Environment/Disponibility";
import EnvironmentRegistration from "../Pages/SuperUser/EnvironmentRegistration/EnvironmentRegistration";
import AttentionList from "../Pages/SuperUser/AttentionRequests/AttentionList";

export default function SuperUserRoutes() {
  return (
    <Routes>
      <Route element={<Sidebar user="superuser" />}>
        <Route path="home" element={<Homepage />}></Route>
        <Route path="environments-disponibility" element={<Disponibility />} />
        <Route
          path="environment-register"
          element={<EnvironmentRegistration />}
        ></Route>
        <Route path="attention-list" element={<AttentionList />}></Route>
      </Route>
    </Routes>
  );
}
