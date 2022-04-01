import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import { Navigate, Outlet, Link } from "react-router-dom";
import { Button } from "@mui/material";

const Private = () => {
  const { user } = useContext(UserContext);

  //Validacion de existencia de usuario, si no existe entonces hacemos que automaticamente la pagina lo redirija al login
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <>
      <Link to="/profile">
        <Button variant="outlined">
          Perfil
        </Button>
      </Link>
      <Outlet />
    </>
  );
};
export default Private;
