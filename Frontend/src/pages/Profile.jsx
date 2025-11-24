import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

// --- Componente principal Profile ---
export const Profile = ({ onLogout }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUserData(data.user);
      } else {
        console.error("Error al obtener perfil, cerrando sesión");
        onLogout();
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      onLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogoutClick = async () => {
    try {
      await fetch("http://localhost:3000/api/logout", {
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al cerrar sesión en el backend:", error);
    } finally {
      onLogout();
      // Redirigir, aunque onLogout debería hacerlo, lo ponemos para asegurar el flujo.
      navigate("/login"); 
    }
  };
  
  // Estilos de neón y cyberpunk
  const neonTitleStyle = {
    color: "#0ea5e9", // Sky Blue 500
    textShadow: `
      0 0 7px #0284c7, // Sky Blue 600 (Darker)
      0 0 20px #38bdf8, // Sky Blue 400 (Lighter)
      0 0 40px #0ea5e9 // Sky Blue 500
    `,
  };

  const neonLogoutButtonStyle = {
    boxShadow: "0 0 8px #f43f5e, 0 0 20px #e11d48", // Rose 500 & 600
  };

  const avatarStyle = {
    boxShadow: "0 0 15px #f0abfc", // Violet 300
    backgroundColor: "#a855f7" // Violet 500
  };


  return (
    <main className="min-h-screen bg-linear-to-b from-gray-900 via-gray-950 to-black text-white px-6 py-20 flex flex-col items-center">
      <section className="relative w-full max-w-xl bg-gray-900/90 border border-violet-900 backdrop-blur-md p-10 rounded-2xl shadow-[0_8px_30px_rgba(76,29,149,0.8)]">

        {/* Encabezado */}
        <div className="flex flex-col items-center mb-10">
          <div 
            className="w-28 h-28 rounded-full flex items-center justify-center text-5xl font-extrabold tracking-wider transition duration-300 transform hover:scale-105"
            style={avatarStyle}
          >
            {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
          </div>
          <h1 
            className="text-4xl font-extrabold mt-6 tracking-widest"
            style={neonTitleStyle}
          >
            {userData?.name
              ? `${userData.name.toUpperCase()} ${userData.lastname.toUpperCase()}`
              : "P E R F I L"}
          </h1>
          <p className="text-sky-400 text-sm mt-2 tracking-wide font-medium">
          </p>
        </div>

        <hr className="border-violet-900 mb-8 opacity-50" />

        {/* Datos del perfil */}
        {!loading && userData && (
          <div className="space-y-4">
            
            {/* Nombre Completo */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-800/80 border border-violet-900 rounded-xl p-4 transition hover:border-sky-500">
              <p className="text-sky-200 font-bold text-sm text-right">
                {userData.name}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-800/80 border border-violet-900 rounded-xl p-4 transition hover:border-sky-500">
              <p className="text-sky-200 font-bold text-sm text-right">
                {userData.lastname}
              </p>
            </div>


            {/* Correo (opcional) */}
            {userData.email && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-800/80 border border-violet-900 rounded-xl p-4 transition hover:border-sky-500">
                <span className="text-gray-400 text-sm mb-1 sm:mb-0 tracking-wider font-mono">
                  [ EMAIL &nbsp; REGISTRADO]
                </span>
                <p className="text-sky-200 font-bold text-sm text-right break-all sm:pl-4">
                  {userData.email}
                </p>
              </div>
            )}
 
            {/* Botón Logout */}
            <button
              onClick={handleLogoutClick}
              style={neonLogoutButtonStyle}
              className="w-full py-3 mt-8 bg-red-700 hover:bg-red-600 text-white font-bold rounded-lg uppercase tracking-widest transition duration-300"
            >
              C E R R A R &nbsp; S E S I Ó N
            </button>
          </div>
        )}
      </section>
    </main>
  );
};