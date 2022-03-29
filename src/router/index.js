/*
 * Para crear nuestras rutas debemos importar :
 * BrowsRouter: Envuleve todas las rutas que creemos
 * Routes: Es el child de BrowsRouter el cual nos va a permitir crear las rutas por componente
 * Route: Es el encargado de recibir el path y el element y renderizarlo en el path creado
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Flags from "../pages/Flags";
import Youtube from "../pages/Youtube";
import YoutubeAdministrador from "../pages/YoutubeAdministrador";
import MovieUpdate from "../pages/MovieUpdate";
import DetailFlag from "../pages/Flags/detalle";
//Layout
import Main from "../layouts/Main";

import Login from "../pages/Login";
import Private from "../layouts/Private";
/*
 * Nuestro Router va a ser un componente el cual se encargue de retornar las rutas con su respectiva vista
 */
import Ecommerce from "../layouts/Ecommerce";
import PopularWeek from "../pages/PopularWeek";
const Router = () => {
  //Como esto es un componente tenemos que usar return para poder crear las rutas
  return (
    <BrowserRouter>
      {/**Route del main PUBLICAS */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Main />}>
          <Route path="/" element={<Home />} />
          <Route path="/flags" element={<Flags />} />
          <Route path="/flags/detail/:name" element={<DetailFlag />} />
          <Route path="/youtube" element={<Youtube />} />
        </Route>
        <Route element={<Ecommerce/>}>
          <Route path="/ecommerce" element={<PopularWeek/>}/>
        </Route>
        {/**Route del admin PRIVADAS */}
        <Route element={<Private />}>
          <Route path="/youtube/admin" element={<YoutubeAdministrador />} />
          <Route path="/youtube/admin/editar/:id" element={<MovieUpdate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
