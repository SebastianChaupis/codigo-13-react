import { Link, Outlet } from "react-router-dom";
import "./main.css"
const Main = () => {
    return (
        <div>
            <nav className="navegar">
                <div>
                    <img src="" alt="" />
                </div>
                <div>
                    <ul className="ul-nav">
                        <li className="li-nav">
                            <Link to="/">Pokemon</Link>
                        </li>

                        <li className="li-nav">
                            <Link to="/flags">Banderas</Link>
                        </li>

                        <li className="li-nav">
                            <Link to="/youtube">Youtube</Link>
                        </li>
                    </ul>
                </div>
            </nav>
            {/*Esto va a recibir los componentes hijos */}
            <Outlet />
        </div>
    );
};
export default Main;