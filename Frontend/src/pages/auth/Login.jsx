import { Link } from "react-router";
import { useForm } from "../../hooks/useForm.js";
import { useState } from "react";

export const Login = ({ onLoginSucces }) => {
  const { values, handleChange, handleReset } = useForm({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    if (!values.username.trim() || !values.password.trim()) {
      setError("Username y password son requeridos");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (response.ok) {
        onLoginSucces();
      } else {
        setError("Credenciales invalidas");
        alert(data.message);
        handleReset();
      }
    } catch (err) {
      console.log(err);
      setError("Error al conectar con el servidor");
    } finally {
      setLoading(false);
    }
  };

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
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-950 to-black flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/90 border border-violet-900 backdrop-blur-md rounded-2xl p-8 shadow-[0_8px_30px_rgba(76,29,149,0.8)]" // Purple shadow
        >
          <h2
            className="text-3xl font-extrabold text-center mb-8 tracking-wider"
            style={neonTitleStyle}
          >
            INICIAR &nbsp; SESIÓN
          </h2>

          {error && (
            <div className="mb-6 text-sm text-red-400 bg-red-900/40 border border-red-700 p-3 rounded-lg animate-pulse">
              {error}
            </div>
          )}

          <label className="block text-sm text-sky-400 mb-2 font-medium">
            // &nbsp; U S E R N A M E
          </label>
          <input
            name="username"
            value={values.username}
            onChange={handleChange}
            placeholder="Introduce tu nombre de usuario"
            className="w-full mb-6 px-4 py-3 bg-gray-800/70 border border-blue-900 text-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
          />

          <label className="block text-sm text-sky-400 mb-2 font-medium">
            //&nbsp; P A S S W O R D
          </label>
          <input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            placeholder="Introduce tu contraseña secreta"
            className="w-full mb-8 px-4 py-3 bg-gray-800/70 border border-blue-900 text-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
          />

          <button
            type="submit"
            disabled={loading}
            style={neonButtonStyle}
            className="w-full bg-linear-to-r from-violet-600 to-fuchsia-600 text-white font-bold py-3 rounded-lg uppercase tracking-widest hover:brightness-125 transition duration-300 disabled:opacity-50 disabled:shadow-none"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                ... L O A D I N G ...
              </span>
            ) : (
              "A C C E D E R"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            onClick={handleReset}
            className="inline-block bg-gray-800 text-gray-400 px-6 py-2 rounded-full font-semibold hover:bg-gray-700/80 transition duration-300 text-sm tracking-wide border border-gray-700 hover:border-violet-500"
          >
            R E S E T E A R
          </button>

          <p className="mt-5 text-sm text-gray-500">
            ¿No estás en el sistema?{" "}
            <Link
              to="/register"
              className="text-fuchsia-400 hover:text-fuchsia-300 hover:underline font-bold transition duration-300"
            >
              R E G I S T R A R S E
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};