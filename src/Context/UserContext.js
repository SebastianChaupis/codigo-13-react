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
    //Vamos a darle la propiedad quantity a lo que es product
    product.quantity = 1;
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
  };
  const deleteElementFromBasket = (id) => {
    const products = basket.filter((bas) => bas.id != id);
    setBasket(products);
    localStorage.setItem("basket", JSON.stringify(products));
  }

  const addOrRemoveProduct = (id, add) => {
    //este id nos va a servir para poder encontrar el product
    //add es un bool por si add es true entonces agrega de lo contrario resta
    const products = basket.map((product)=>{
      if(product.id == id){
        if(add){
          product.quantity +=1;
        }
        else{
          //Debemos validad que la cantidad minima para poder restar sea 1 
          if(product.quantity> 1){
            product.quantity -= 1;
          }
        }
      }
      return {
        ...product,
      };
    });
    setBasket(products);
    localStorage.setItem("basket", JSON.stringify(products));
  }

  const storeUser = (dataUser) => {
    localStorage.setItem("user", JSON.stringify(dataUser));
    setUser(dataUser);
  };


  return <UserContext.Provider value={{ user, storeUser, basket, storeBasket, deleteElementFromBasket,addOrRemoveProduct }}>{props.children}</UserContext.Provider>;
};
