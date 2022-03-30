import { createContext, useState } from "react";


export const UserContext = createContext();

export const UserProvider = (props) => {


  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  //La primera vez que se entra a la web la sgte const vale NULL
  const [basket, setBasket] = useState(
    JSON.parse(localStorage.getItem("basket")) ?? []
  );

  //Vamos a guardar el objeto de cada producto
  const storeBasket = (product) => {
    //basket sera un array de objetos
    setBasket([...basket, product]);
    localStorage.setItem("basket", JSON.stringify([...basket, product]));
    /*
    if(basket==null){
      const dataToStorage =[product];
      setBasket(dataToStorage);
      localStorage.setItem("basket", JSON.stringify(dataToStorage));
    }else{
      const dataToStorage=[...basket, product];
      setBasket(dataToStorage);
      localStorage.setItem("basket", JSON.stringify(dataToStorage));
    }*/
  }

  const storeUser = (dataUser) => {
    localStorage.setItem("user", JSON.stringify(dataUser));
    setUser(dataUser);
  };


  return <UserContext.Provider value={{ user, storeUser, basket, storeBasket }}>{props.children}</UserContext.Provider>;
};
