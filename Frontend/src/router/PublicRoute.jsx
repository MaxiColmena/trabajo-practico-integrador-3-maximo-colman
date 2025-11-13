import { Routes, Route } from "react-router";
import { LoginPage } from "../pages/LoginPage.jsx";

export const PublicRoute = () => {
  return (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}


