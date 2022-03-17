/*
Este sera nuestro archivo donde almacenaremos nuestras peticiones
*/

//Una buena practica es tener la URL del API en una variable
const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=200";

//Podemos crear una funcion generica la cual se encargue de hacer la peticion
// como parametro vamos a recibir la URL que puede ser la que lista o la que nos da el detalle
// url sera el parametro que reciba la url hacia donde se hará la peticion

// mientras no se le asigne un valor a url este sera igual a BASE_URL
export const getDataFromPokemon = async(url =BASE_URL)=>{
    try {
        //ahora debemos ejecutar el fetch para poder traer la informacion
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message)
    }
};