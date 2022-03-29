import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const Private = () => {
  const { user } = useContext(UserContext);

  //Validacion de existencia de usuario, si no existe entonces hacemos que automaticamente la pagina lo redirija al login
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
export default Private;
