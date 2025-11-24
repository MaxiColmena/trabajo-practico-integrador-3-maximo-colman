import { useState } from "react";
import { Link } from "react-router";
import {useForm} from "../../hooks/useForm";
import {Loading} from "../../components/Loading";

// --- Componente principal Register ---
export const Register = ({ onLoginSuccess }) => {
  const { values, handleChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    dni: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Nuevo estado para manejo de errores

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores
    setLoading(true);

    // Mapeando los datos como pide el backend
    const payload = {
      name: values.firstname,
      lastname: values.lastname,
      username: values.username,
      email: values.email,
      password: values.password,
    };

    try {
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        onLoginSuccess();
      } else {
        // Reemplazo de alert()
        const message = data.message || "Error en el registro";
        setError(message);
        console.error("Registro fallido:", message);
        handleReset();
      }
    } catch (err) {
      console.error(err);
      // Reemplazo de alert()
      setError("Error al conectar con el servidor");
      handleReset();
    } finally {
      setLoading(false);
    }
  };

  // Estilos de neón replicados del componente Login
  const neonTitleStyle = {
    color: "#0ea5e9", // Sky Blue 500
    textShadow: `
      0 0 7px #0284c7, // Sky Blue 600 (Darker)
      0 0 20px #38bdf8, // Sky Blue 400 (Lighter)
      0 0 40px #0ea5e9 // Sky Blue 500
    `,
  };

  const neonButtonStyle = {
    boxShadow: "0 0 8px #a855f7, 0 0 20px #c084fc", // Violet 500 & 400
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-b from-gray-900 via-gray-950 to-black text-white py-12 px-4">
      {/* Muestra el componente Loading si está cargando */}
      {loading && <Loading />}
      
      <div className="w-full max-w-lg bg-gray-900/90 border border-violet-900 backdrop-blur-md p-8 rounded-2xl shadow-[0_8px_30px_rgba(76,29,149,0.8)]">
        {/* Encabezado */}
        <h2
          className="text-3xl font-extrabold text-center mb-2 tracking-wider"
          style={neonTitleStyle}
        >
          C R E A R &nbsp; C U E N T A
        </h2>
        <p className="text-center text-sm text-sky-400 mb-8">
          // Completa los campos para registrarte en el sistema
        </p>


        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Usuario */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-sky-400 mb-2"
            >
             U S E R N A M E
            </label>
            <input
              id="username"
              name="username"
              type="text"
              placeholder="Nombre de usuario"
              value={values.username}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/70 border border-blue-900 text-sky-200 placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-sky-400 mb-2"
            >
            A D D R E S S
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="correo@ejemplo.com"
              value={values.email}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/70 border border-blue-900 text-sky-200 placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
              required
            />
          </div>

          {/* Contraseña */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-sky-400 mb-2"
            >
            P A S S W O R D
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={values.password}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/70 border border-blue-900 text-sky-200 placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
              required
            />
          </div>

          {/* Nombre y Apellido */}
          <div className="flex gap-4">
            <div className="w-1/2">
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-sky-400 mb-2"
              >
                 F I R S T &nbsp; N A M E
              </label>
              <input
                id="firstname"
                name="firstname"
                type="text"
                placeholder="Nombre"
                value={values.firstname}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/70 border border-blue-900 text-sky-200 placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
                required
              />
            </div>
            <div className="w-1/2">
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-sky-400 mb-2"
              >
               L A S T &nbsp; N A M E
              </label>
              <input
                id="lastname"
                name="lastname"
                type="text"
                placeholder="Apellido"
                value={values.lastname}
                onChange={handleChange}
                disabled={loading}
                className="w-full px-4 py-3 rounded-lg bg-gray-800/70 border border-blue-900 text-sky-200 placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
                required
              />
            </div>
          </div>

          {/* DNI */}
          <div>
            <label
              htmlFor="dni"
              className="block text-sm font-medium text-sky-400 mb-2"
            >
             I D &nbsp; D O C U M E N T
            </label>
            <input
              id="dni"
              name="dni"
              type="text"
              placeholder="12345678"
              value={values.dni}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg bg-gray-800/70 border border-blue-900 text-sky-200 placeholder-gray-500
                focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
              required
            />
          </div>

          {/* Boton */}
          <button
            type="submit"
            style={neonButtonStyle}
            className="w-full py-3 bg-linear-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-lg uppercase tracking-widest hover:brightness-125 transition duration-300 disabled:opacity-50 disabled:shadow-none mt-8"
            disabled={loading}
          >
            {loading ? "E N R O L L I N G . . ." : "R E G I S T R A R S E"}
          </button>
        </form>

        {/* Login */}
        <p className="text-center text-sm text-gray-500 mt-6">
          ¿Ya estás en el sistema?{" "}
          <Link
            to="/login"
            className="text-fuchsia-400 hover:text-fuchsia-300 cursor-pointer transition font-bold"
          >
            I N I C I A R &nbsp; S E S I Ó N
          </Link>
        </p>
      </div>
    </main>
  );
};