import { useState } from "react";

const Form = ()=>{
    //capturar el valor de un input
    const [nombre,setNombre] = useState("");
    const [apellido,setApellido] = useState("");
    //En react la forma de obtener el valor de un input es usando onChange este evento permite capturar
    // el valor de los inputs y guardarlos en una variable

    //Event es solo el nombre, puede ser cualquiera 
    const handleInputName = (event)=>{
        //Damos el valor a nombre, recordar que el valor va dentro de los "()""
        setNombre(event.target.value);
    }
    const handleInputLastName =(event)=>{
        setApellido(event.target.value);
    }
    return(
        <div>
            <from action="">
                <h4>Formulario de registro</h4>     
                <h4>Nombre {nombre}</h4>      
                <h4>Apellido {apellido}</h4>         
                <p>
                    <input type="text" onChange={handleInputName} placeholder="Ingrese su nombre"></input>
                </p>
                <p>
                     <input type="text" onChange={handleInputLastName} placeholder="Ingrese su apellido"></input>
                </p>
                <p>
                    <input type="email" placeholder="Ingrese su email"></input>
                </p>
                <p>
                    <input type="password" placeholder="Ingrese su password"></input>
                </p>
                <p>
                    <button type="submit">Registrar</button>
                </p>
            </from>
        </div>
    );
};
export default Form;