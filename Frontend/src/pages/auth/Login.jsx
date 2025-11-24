import { useForm } from "../../hooks/useForm"
import { useNavigate } from "react-router";

export const Login = () => {
  const navigate = useNavigate();
  const { handleChange, handleReset, formValue } = useForm({
    username: "",
    password: "",
  });

  //Esta función evita que la página se recargue al enviar el formulario
  const handleSumit = async(e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json", 
          
        },
        body: JSON.stringify(formValue),
        credentials: 'include'
      });

      if(response.ok) {
        navigate("/Home")
      }else {
        console.log("Credenciales inválidas o incorrectas");
      }
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
    }
  }
    return (
      <div>
    <form onSubmit={handleSumit}>
        <label>Username</label>
        <input type="text" name="username" placeholder="username" value={formValue.username} onChange={handleChange} required/>
        <br/>
        <label>Password</label>
        <input type="password" name="password" placeholder="password" value={formValue.password} onChange={handleChange} required/>
        <br/>
        <button type="submit">Iniciar Sesion</button>
      </form>
    </div> 
    
  )
};

