import { Link, useNavigate } from "react-router";

//Navbar que contiene enlaces a las diferentes secciones de la aplicación
export const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <Link to="/">Home</Link>
      <Link to="/Tasks">Tasks</Link>
      <Link to="/Profile">Profile</Link>
    </nav>
  )
};