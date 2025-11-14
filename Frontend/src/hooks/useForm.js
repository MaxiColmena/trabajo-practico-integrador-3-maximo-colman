import { useState } from "react";

//función para cuando escribimos en un input, se actualice el estado del formulario

export const useForm = (initialValues = {}) => {
    const [formValue, setFormValue] = useState(initialValues);

    //función de handleChange para actualizar el estado del formulario con los cambios en los inputs
    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormValue({
            ...formValue,
            [name]: value,
        });
    }

    
    //función para resetear el formulario a su estado inicial
    const HandleReset = () => {
        setFormValue (initialValues);
    }


  return {
          formValue,
          handleChange,
          HandleReset
      }
}
