import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import LandingPage from "./Pages/LandingPage/LandingPage";
import UserRoutes from "./routes/UserRoutes";
import SuperUserRoutes from "./routes/SuperUserRoutes";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<LandingPage />} />
        {/* Routes for user*/}
        <Route path="/user/*" element={<UserRoutes />} />
        {/* Routes for superuser */}
        <Route path="/superuser/*" element={<SuperUserRoutes />} />
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
