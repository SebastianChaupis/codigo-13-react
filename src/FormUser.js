import { useState } from "react";
import { TextField, Button } from "@mui/material";

const FormUser = () => {
const [valorDeInputs, setValorInputs]= useState({
    nombre:"",
    apellido:"",
    correo:"",
    password:"",
});
const handleInputValues=(event)=>{
    //debemos extraer 2 cosas -> el name de cada input y el key
    const {name,value}= event.target;
    //...valorDeInputs es para hacer una copia del objeto actual y ademas estamos agregando el nuevo key y value que recibimos
    //[name]-> name es una variable por eso para poder usarla como key debemos colocarlo entre "[]"
    setValorInputs({
        ...valorDeInputs,
        [name]:value,
    });
}
    return (
        <div>
            <form action="">
                <h4 className="title">Formulario de registro</h4>
                <h4>{valorDeInputs.nombre}</h4>
                <h4>{valorDeInputs.apellido}</h4>
                <h4>{valorDeInputs.correo}</h4>
                <h4>{valorDeInputs.password}</h4>
                <p>
                    <TextField type="text" name="nombre" onChange={handleInputValues} label="Ingrese su nombre"/>
                </p>
                <p>
                    <TextField type="text" name="apellido" onChange={handleInputValues} label="Ingrese su apellido"/>
                </p>
                <p>
                    <TextField type="email" name="correo" onChange={handleInputValues} label="Ingrese su email"/>
                </p>
                <p>
                    <TextField type="password" name="password" onChange={handleInputValues} label="Ingrese su password"/>
                </p>
                <p>
                    <Button type="submit" >Registrar</Button>
                </p>
            </form>
        </div>
    );
}
export default FormUser;