import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useForm } from "../hooks/useForm";


// --- Componente principal Tasks ---
export const Tasks = () => {
  // Estados de la lista de tareas
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Hook del formulario
  const { values, setValues, handleChange, handleReset } = useForm({
    title: "",
    description: "",
    is_completed: false,
  });

  // Estado para saber si estamos creando o editando
  const [idToEdit, setIdToEdit] = useState(null);
  
  // Estado para gestionar la confirmación de borrado (reemplaza window.confirm)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Helper para limpiar mensajes después de un tiempo
  const clearMessages = () => {
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 4000);
  };

  const fetchTasks = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/tasks-by-user", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setTasks(data.tasks || (Array.isArray(data) ? data : []));
      } else {
        console.error("Error al obtener las tareas");
        setTasks([]);
      }
    } catch (error) {
      console.error(error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Funcion para manejar el envios
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setConfirmDeleteId(null);
    
    if (!values.title) {
      setErrorMessage("// ERROR: El campo 'TÍTULO' es obligatorio.");
      clearMessages();
      return;
    }

    if (idToEdit) {
      handleUpdateTask();
    } else {
      handleCreateTask();
    }
  };

  // Funcion que se llama al presionar Editar en una tarea
  const handleSelectEdit = (task) => {
    setErrorMessage("");
    setSuccessMessage("");
    setIdToEdit(task.id);
    setValues({
      title: task.title,
      description: task.description,
      is_completed: task.is_completed,
    });
  };

  // Funcion para Cancelar operacion
  const handleCancelEdit = () => {
    setIdToEdit(null);
    setConfirmDeleteId(null);
    handleReset();
    setErrorMessage("");
    setSuccessMessage("");
  };

  // Funcion para Crear
  const handleCreateTask = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setSuccessMessage("// STATUS: Tarea [CREADA] exitosamente!");
        handleReset();
        fetchTasks();
        clearMessages();
      } else {
        const data = await res.json();
        setErrorMessage(data.message || "// ERROR: Error al crear la tarea.");
        clearMessages();
      }
    } catch (error) {
      setErrorMessage("// CONNECTION ERROR: Error de conexión al crear la tarea.");
      clearMessages();
    }
  };

  // Funcion para Actualizar
  const handleUpdateTask = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${idToEdit}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setSuccessMessage("// STATUS: Tarea [ACTUALIZADA] exitosamente!");
        handleCancelEdit();
        fetchTasks();
        clearMessages();
      } else {
        const data = await res.json();
        setErrorMessage(data.message || "// ERROR: Error al actualizar la tarea.");
        clearMessages();
      }
    } catch (error) {
      setErrorMessage("// CONNECTION ERROR: Error de conexión al actualizar la tarea.");
      clearMessages();
    }
  };

  // 1. Inicia el flujo de confirmación de borrado (reemplaza window.confirm)
  const handleDeleteClick = (taskId) => {
    setConfirmDeleteId(taskId);
    setErrorMessage("// A T T E N T I O N: Confirma la eliminación de la tarea. Haz click en BORRAR DATO.");
  };

  // 2. Ejecuta el borrado después de la confirmación
  const handleConfirmDeletion = async () => {
    const taskId = confirmDeleteId;
    if (!taskId) return;
    
    // Clear messages and confirmation state
    setErrorMessage("");
    setSuccessMessage("");
    setConfirmDeleteId(null);
    
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setSuccessMessage("// STATUS: Tarea eliminada exitosamente.");
        fetchTasks();
      } else {
        const data = await res.json();
        setErrorMessage(data.message || "// ERROR: Error al eliminar la tarea.");
      }
    } catch (error) {
      setErrorMessage("// CONNECTION ERROR: Error de conexión al eliminar la tarea.");
    } finally {
      clearMessages();
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

  const primaryButtonStyle = {
    boxShadow: "0 0 8px #a855f7, 0 0 20px #c084fc", // Violet 500 & 400
  };
  
  const secondaryButtonStyle = {
    boxShadow: "0 0 5px #f43f5e, 0 0 10px #e11d48", // Rose/Red
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-gray-900 via-gray-950 to-black text-white px-6 py-16">
      <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Formulario para crear y editar */}
        <section className="md:col-span-1">
          <h2 className="text-3xl font-extrabold mb-6 tracking-wider">
            {idToEdit ? "EDITAR" : "CREAR"}{" "}
            <span style={neonTitleStyle}>TAREA</span>
          </h2>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-900/90 border border-violet-900 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_30px_rgba(76,29,149,0.8)] space-y-5"
          >
            {/* Mensajes de feedback */}
            {successMessage && (
              <div className="text-sm text-green-400 bg-green-900/40 border border-green-700 p-3 rounded-lg animate-pulse">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="text-sm text-red-400 bg-red-900/40 border border-red-700 p-3 rounded-lg animate-pulse">
                {errorMessage}
              </div>
            )}

            {/* Titulo */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-sky-400 mb-2 tracking-wider"
              >
                // TITULO
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={values.title}
                onChange={handleChange}
                placeholder="Ej: Comprar leche (Campo obligatorio)"
                className="w-full px-4 py-3 rounded-lg bg-gray-800/70 border border-blue-900 text-sky-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
              />
            </div>

            {/* Descripcion */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-sky-400 mb-2 tracking-wider"
              >
                //DESCRIPCIÓN
              </label>
              <textarea
                id="description"
                name="description"
                value={values.description}
                onChange={handleChange}
                rows="3"
                placeholder="Detalles de la tarea..."
                className="w-full px-4 py-3 rounded-lg bg-gray-800/70 border border-blue-900 text-sky-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 transition duration-300"
              ></textarea>
            </div>

            {/* Checkbox Completada */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="is_completed"
                name="is_completed"
                checked={values.is_completed}
                onChange={handleChange}
                className="h-5 w-5 rounded-md bg-gray-800 border-violet-500 text-fuchsia-500 focus:ring-fuchsia-500 cursor-pointer"
              />
              <label htmlFor="is_completed" className="text-sm text-sky-400 font-medium tracking-wide">
                MARCAR &nbsp; COMO &nbsp; COMPLETADA
              </label>
            </div>

            {/* Boton principal para guardar/actualizar tarea */}
            <button
              type="submit"
              style={primaryButtonStyle}
              className="w-full py-3 bg-linear-to-r from-violet-600 to-fuchsia-600 text-white font-bold rounded-lg uppercase tracking-widest hover:brightness-125 transition duration-300 disabled:opacity-50 mt-6"
              disabled={loading}
            >
              {idToEdit ? "ACTUALIZAR TAREA" : "GUARDAR  TAREA"}
            </button>

            {/* Botón de Cancelar (solo aparece si estamos editando) */}
            {idToEdit && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium rounded-lg uppercase tracking-wider transition duration-300"
              >
                CANCELAR &nbsp; EDICIÓN
              </button>
            )}
            
            {/* Botón de Confirmación de Borrado (solo aparece si confirmDeleteId tiene un valor) */}
            {confirmDeleteId && (
              <button
                type="button"
                onClick={handleConfirmDeletion}
                style={secondaryButtonStyle}
                className="w-full py-3 bg-red-700 hover:bg-red-600 text-white font-bold rounded-lg uppercase tracking-widest transition duration-300"
              >
                BORRAR &nbsp; DATO
              </button>
            )}
          </form>
        </section>

        {/* Lista de Tareas*/}
        <section className="md:col-span-2">
          <h2 className="text-3xl font-extrabold mb-6 tracking-wider">
            MIS &nbsp; <span style={neonTitleStyle}>TAREAS</span>
          </h2>

          <div className="bg-gray-900/90 border border-violet-900 backdrop-blur-md p-6 rounded-2xl shadow-[0_8px_30px_rgba(76,29,149,0.8)] relative min-h-[200px]">

            {!loading && (
              <>
                {tasks.length === 0 ? (
                  <p className="text-center text-sky-400/70 pt-10 text-lg font-medium tracking-wider">
                    // SIN &nbsp; TAREAS . . . &nbsp; CREA &nbsp; UNA &nbsp; NUEVA
                  </p>
                ) : (
                  // Lista de tareas (.map)
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`border-l-4 p-4 rounded-lg flex justify-between items-center transition duration-300 ${
                          task.is_completed
                            ? "bg-gray-800/50 border-green-500 hover:bg-gray-800/70"
                            : "bg-gray-800/80 border-fuchsia-500 hover:bg-gray-700/80"
                        }`}
                      >
                        <div className="pr-4">
                          <h3
                            className={`text-xl font-bold tracking-wide ${
                              task.is_completed
                                ? "text-gray-400 line-through"
                                : "text-sky-200"
                            }`}
                          >
                            {task.title}
                          </h3>
                          <p
                            className={`text-sm tracking-tight ${
                              task.is_completed
                                ? "text-gray-500 line-through"
                                : "text-gray-400"
                            }`}
                          >
                            {task.description || "Sin descripción"}
                          </p>
                        </div>
                        {/* Botones de Accion */}
                        <div className="flex gap-3 flex-shrink-0">
                          <button
                            onClick={() => handleSelectEdit(task)}
                            className="text-sm bg-sky-600 hover:bg-sky-500 text-white px-4 py-2 rounded-full font-semibold transition duration-300 shadow-md shadow-sky-600/30"
                          >
                            EDITAR
                          </button>
                          <button
                            onClick={() => handleDeleteClick(task.id)}
                            className="text-sm bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-full font-semibold transition duration-300 shadow-md shadow-red-600/30"
                          >
                            BORRAR
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};