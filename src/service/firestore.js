import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore/lite";
import { v4 as uuidv4 } from "uuid";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
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
const db = getFirestore(app);
//Peticion para poder traer los productos 
export const getProductClothes = async () => {
  //paso 1: Traer la coleccion de datos
  const collectionClothe = collection(db, "product_clothes");
  //paso 2: Traer los documentos 
  const documentClothes = await getDocs(collectionClothe);
  //paso 3: Crear un arreglo que guarde los documentos
  const clothes = documentClothes.docs.map((doc) => doc.data());
  return clothes;
};
//Crear elemntos en nuestra BD
export const storeProductClothe = async (product) => {
  const id = uuidv4().replaceAll("-", "");
  product.id = id;
  await setDoc(doc(db, "product_clothes", id), product);
}

export const updateProductClothe = async (product) => {
  const productRef = doc(db, "product_clothes", product.id);
  await updateDoc(productRef, product);
}
export const deleteProductClothe = async (id) => {
  await deleteDoc(doc(db, "product_clothes", id));
}

//Crearemos una funcion que reciba un email y password y cree una cuenta en firebase
export const auth = getAuth();
//esta funcion va a enviar el correo de verificacion 
export const sendEmail = async () => {
  const send = await sendEmailVerification(auth.currentUser);
  return send;
}
//Podemos crear una funcion que nos retorne el usuario actual
export const getUserFromFirebase = () => {
  return auth.currentUser;//Esto sabe que usuario tiene la sesion
}
export const updateUserProfile = async (profile) => {
  try {
    await updateProfile(auth.currentUser, profile);
    return {
      ok: true,
      data: "success",
    };
  } catch (error) {
    return {
      ok: false,
      data: error.message,
    };
  }
};
export const storeUser = async (email, password) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    console.log(user);
    return {
      ok: true,
      data: user,
    };
  }
  catch (error) {
    console.log(error.message);
    return {
      ok: false,
      data: error.message,
    }
  }
};
export const loginUser = async (email, password) => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return {
      ok: true,
      data: user,
    };
  } catch (error) {
    return {
      ok: false,
      data: error.message,
    };
  }
}