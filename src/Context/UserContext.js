import { createContext, useState } from "react";


export const UserContext = createContext();

export const UserProvider = (props) => {
  

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const storeUser = (dataUser) => {
    localStorage.setItem("user", JSON.stringify(dataUser));
    setUser(dataUser);
  };
  const [pedidos, setPedidos] = useState(["pedido1","pedido2"]);

  return <UserContext.Provider value={{user, storeUser, pedidos, setPedidos}}>{props.children}</UserContext.Provider>;
};
