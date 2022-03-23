/*
 * Para crear nuestras rutas debemos importar :
 * BrowsRouter: Envuleve todas las rutas que creemos
 * Routes: Es el child de BrowsRouter el cual nos va a permitir crear las rutas por componente
 * Route: Es el encargado de recibir el path y el element y renderizarlo en el path creado
 */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home"
import Flags from "../pages/Flags";
import Youtube from "../pages/Youtube";
import YoutubeAdministrador from "../pages/YoutubeAdministrador";
import MovieUpdate from "../pages/MovieUpdate";
/*
 * Nuestro Router va a ser un componente el cual se encargue de retornar las rutas con su respectiva vista
 */
const Router = () => {
    //Como esto es un componente tenemos que usar return para poder crear las rutas
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/pokemon" element={<Home />} />
                <Route path="/flags" element={<Flags/>}/>
                <Route path="/youtube" element={<Youtube/>}/>
                <Route path="/youtube/admin" element={<YoutubeAdministrador/>}/>
                <Route path="/youtube/admin/editar/:id" element={<MovieUpdate/>}/>
            </Routes>
        </BrowserRouter>

    )

}
export default Router;