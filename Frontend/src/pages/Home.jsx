import { useState, useEffect } from "react";
import { Link } from "react-router";


export const Home = () => {
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Funcion para cargar ambos datos (perfil y tareas)
  const loadHomeData = async () => {
    try {
      const profilePromise = fetch("http://localhost:3000/api/profile", {
        credentials: "include",
      });
      const tasksPromise = fetch("http://localhost:3000/api/tasks-by-user", {
        credentials: "include",
      });

      // Ejecutamos ambas peticiones al mismo tiempo
      const [profileRes, tasksRes] = await Promise.all([
        profilePromise,
        tasksPromise,
      ]);

      // Procesamos los datos del perfil
      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setUserData(profileData.user);
      } else {
        console.error("Error al cargar el perfil");
      }

      // Procesamos los datos de las tareas
      if (tasksRes.ok) {
        const tasksData = await tasksRes.json();
        setTasks(
          tasksData.tasks || (Array.isArray(tasksData) ? tasksData : []),
        );
      } else {
        console.error("Error al cargar las tareas");
      }
    } catch (error) {
      console.error("Error en las peticiones de Home:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, []);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.is_completed).length;
  const pendingTasks = totalTasks - completedTasks;

  // Estilos de neón y cyberpunk
  const neonTitleStyle = {
    color: "#0ea5e9",
    textShadow: `
      0 0 7px #0284c7, // Sky Blue 600 (Darker)
      0 0 20px #38bdf8, // Sky Blue 400 (Lighter)
      0 0 40px #0ea5e9 // Sky Blue 500
    `,
  };

  const neonLinkStyle = {
    boxShadow: "0 0 8px #a855f7, 0 0 20px #c084fc",
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-900 via-gray-950 to-black text-white px-6 py-16">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 tracking-wider">
          WELCOME,{" "}
          <span className="text-fuchsia-400" style={neonTitleStyle}>
            {userData?.username || userData?.name || "U S U A R I O"}
          </span>
        </h1>

        {/* Contenedor de Estadisticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Tareas */}
          <div className="bg-gray-900/90 border border-violet-900 backdrop-blur-md p-6 rounded-2xl shadow-[0_4px_20px_rgba(76,29,149,0.4)] text-center transition hover:scale-[1.02] duration-300">
            <h3 className="text-6xl font-extrabold text-sky-400">
              {totalTasks}
            </h3>
            <p className="text-lg text-sky-200 mt-2 font-medium tracking-wider">
              TOTAL DE TAREAS
            </p>
          </div>

          {/* Tareas Completadas */}
          <div className="bg-gray-900/90 border border-violet-900 backdrop-blur-md p-6 rounded-2xl shadow-[0_4px_20px_rgba(76,29,149,0.4)] text-center transition hover:scale-[1.02] duration-300">
            <h3 className="text-6xl font-extrabold text-green-400">
              {completedTasks}
            </h3>
            <p className="text-lg text-sky-200 mt-2 font-medium tracking-wider">
              COMPLETADAS
            </p>
          </div>

          {/* Tareas Pendientes */}
          <div className="bg-gray-900/90 border border-violet-900 backdrop-blur-md p-6 rounded-2xl shadow-[0_4px_20px_rgba(76,29,149,0.4)] text-center transition hover:scale-[1.02] duration-300">
            <h3 className="text-6xl font-extrabold text-red-500">
              {pendingTasks}
            </h3>
            <p className="text-lg text-sky-200 mt-2 font-medium tracking-wider">
              P E N D I E N T E S
            </p>
          </div>
        </div>

        {/* Ir a Tareas */}
        <div className="text-center mt-12">
          <Link
            to="/tasks"
            style={neonLinkStyle}
            className="inline-block py-4 px-10 bg-linear-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-lg uppercase tracking-widest hover:brightness-125 transition duration-300 text-lg disabled:opacity-50"
          >
            ACCEDER &nbsp; A &nbsp; MIS &nbsp; TAREAS
          </Link>
        </div>
      </div>
    </main>
  );
};