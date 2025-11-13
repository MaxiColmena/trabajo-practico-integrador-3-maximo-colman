//función para cuando escribimos en un input, se actualice el estado del formulario

const useForm = (initialState={}) => {
    const {name, value} = e.target;
    setForm ({
        ...form,
        [name]: value
    });

    //función de handleChange para actualizar el estado del formulario con los cambios en los inputs
    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    //función para resetear el formulario a su estado inicial
    const HandleReset = () => {
        setForm (initialState);
    }
    

    //función para que el formulario no se recargue al enviarlo
    handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    }

  return (
    <div>
      
    </div>
  )
}

export default useForm
