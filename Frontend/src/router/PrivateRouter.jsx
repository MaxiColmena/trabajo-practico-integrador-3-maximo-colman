import { Navigate, Outlet } from "react-router";

export const PrivateRoutes = ({authStatus}) => {
  return authStatus === "authenticated" ? <Outlet /> : <Navigate to={"/login"} />;
};
