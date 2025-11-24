import { Link, useNavigate } from "react-router";

//Navbar que contiene enlaces a las diferentes secciones de la aplicación
export const Navbar = ({authStatus, onLogout}) => {
  const navigate = useNavigate();
  const handleLogout = async() => {
    try {
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        onLogout();
        navigate('/login');
      }
    } catch (error) {
      console.log('Errror al cerrar sesión:', error);
    };

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <Link to="/">Home</Link>
      <Link to="/Tasks">Tasks</Link>
      <Link to="/Profile">Profile</Link>
    </nav>
  )
}
};