import { async } from "@firebase/util";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";


const firebaseConfig = {
  apiKey: "AIzaSyB33q2SiEkDvc0gmLxdH8QAX_WjeN4ccZM",
  authDomain: "codigo13-4fb7f.firebaseapp.com",
  projectId: "codigo13-4fb7f",
  storageBucket: "codigo13-4fb7f.appspot.com",
  messagingSenderId: "1021150544416",
  appId: "1:1021150544416:web:69c5e315d971396c4ab245",
  measurementId: "G-1JQ15QLJ6J",
};
const app = initializeApp(firebaseConfig);
//Iniciar firestore
//database : base de datos
const db= getFirestore(app);
//Peticion para poder traer los productos 
export const getProductClothes = async ()=>{
  //paso 1: Traer la coleccion de datos
  const collectionClothe= collection(db, "product_clothes");
  //paso 2: Traer los documentos 
  const documentClothes = await getDocs(collectionClothe);
  //paso 3: Crear un arreglo que guarde los documentos
  const clothes = documentClothes.docs.map((doc)=>doc.data());
  return clothes;
};
