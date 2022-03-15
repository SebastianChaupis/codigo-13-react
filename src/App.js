//importamos useState desde React
import { useState } from "react";

//Crear componente desde 0
const PrimerComponente = ()=>{
    //como usar una variable en un componente
    const edad=21;
    //React tiene una funcion llamada useState
    //useState es una funcion interja de React la cual se encarga de manejar el estado de una variable(se debe importar)
    
    //Al usar useState la forma en la cual creamos una variable cambia porque debemos definir 
    // 2 cosas primero, el nombre de la varible y segundo la funcion que se encarga de cambiar el estado de 
    //la variable
    //count : Es la variable que usaremos para poder mostrar el valor
    //setCount: Es la funcion que se encarga de poder asignarle un valor a count

    const[count,setCount] =useState(0);
    //El valor que va dentro de useState sera el valor inicial de la variable

    const sumar =()=>{
        setCount(count+1);
    }
    const restar =()=>{
        setCount(count-1);
    }
    return(
      <div>
          <h1>Hola mundo tengo {count}</h1>
          <div>
              <h4>Botones</h4>
              <button onClick={sumar}>Sumar</button>
              <button onClick={restar}>Restar</button>
          </div>
      </div>
    
    );
};
//Luego de crear el componente debemos exportarlo
//Default es como decir que este archivo unicamente esta exportando este componente
export default PrimerComponente;