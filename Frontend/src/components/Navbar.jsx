import { Link } from "react-router";

const Navbar = ({ authStatus, onLogout }) => {
  const handleLogoutClick = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al cerrar sesión en el backend:", error);
    } finally {
      onLogout();
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 text-white z-50">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* Links */}
        <div className="flex items-center gap-6 text-sm">
          {authStatus === "authenticated" ? (
            <>
              <Link
                to="/home"
                className="text-zinc-300 hover:text-red-500 transition"
              >
                Inicio
              </Link>
              <Link
                to="/tasks"
                className="text-zinc-300 hover:text-red-500 transition"
              >
                Tareas
              </Link>
              <Link
                to="/profile"
                className="text-zinc-300 hover:text-red-500 transition"
              >
                Perfil
              </Link>
              <button
                onClick={handleLogoutClick}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg font-medium transition shadow-md shadow-red-600/20"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-zinc-300 hover:text-red-500 transition"
              >
                Iniciar sesión
              </Link>
              <Link
                to="/register"
                className="text-zinc-300 hover:text-red-500 transition"
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
