import { useForm } from "../../hooks/useForm"
import { useEffect } from "react";

export const Login = () => {
  const { handleChange, HandleReset, formValue } = useForm({
    username: "",
    password: "",
  });

  useEffect(() => {
    HandleReset();
  }, []);

  return (
    <>
      <form>
        <label>Username</label>
        <input type="text" name="username" placeholder="username" value={formValue.username} onChange={handleChange} required/>
        <br/>
        <label>Password</label>
        <input type="password" name="password" placeholder="password" value={formValue.password} onChange={handleChange} required/>
        <br/>
        <button type="submit">Iniciar Sesion</button>
      </form>
    </>
  )
}
