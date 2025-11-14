import { Router, Route, Routes } from "react-router";
import { Login } from "../pages/auth/Login";
import { Register } from "../pages/auth/Register";
import { Home } from "../pages/Home";

export const AppRouter = () => {
  return (
    <Routes>
      {/*el path es la ruta de la url y el component es el componente que quiero renderizar */}
      <Route path="/home" Component={Home} />
      <Route path="/login" Component={Login} />
      <Route path="/register" Component={Register} />
    </Routes>
  );
}