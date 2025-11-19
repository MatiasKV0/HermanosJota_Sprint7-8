import { Link, useLocation } from "react-router-dom";
import {useState} from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import "./header.css";

export default function Header() {
  const { cart } = useCart();
  const { auth, logout } = useAuth();
  const location = useLocation();
  const [show, setShow] = useState(false);

  const total = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const handleClick = () => {
    setShow(!show);
  };

  const handleCerrarSesion = () => {
    logout();
  };

  return (
    <header className="header">
      <Link to="/">
        <img src="/img/logo.svg" alt="Mueblería Hermanos Jota Logo" />
      </Link>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
      </nav>
      <div>
      <Link to="carrito" id="carrito-icon">
        {location.pathname !== "/carrito" && total > 0 && total < 100 && (
          <span id="carrito-total" style={{ padding: "3px" }}>{total}</span>
        )}
        {location.pathname !== "/carrito" && total > 99 && (
          <span id="carrito-total" style={{ padding: "0px" }}>+99</span>
        )}
        <img src="/img/cart.svg" alt="Carrito de Compras" />
      </Link>
      <div id="user-icon" onClick={handleClick}>
        <svg width="45px" height="45px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.3163 19.4384C5.92462 18.0052 7.34492 17 9 17H15C16.6551 17 18.0754 18.0052 18.6837 19.4384M16 9.5C16 11.7091 14.2091 13.5 12 13.5C9.79086 13.5 8 11.7091 8 9.5C8 7.29086 9.79086 5.5 12 5.5C14.2091 5.5 16 7.29086 16 9.5ZM22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {show && <div id="user-dropdown">
          {auth ? 
          <div className="menu-user">
          <Link to="/perfil">Perfil</Link>
          <Link to="/mis-pedidos">Mis Pedidos</Link>
          {auth.rol === "admin" && <Link to="/dashboard">Dashboard</Link>}
          <Link to="/" onClick={handleCerrarSesion}>Cerrar Sesión</Link>
          </div>
        :
          <div className="menu-user">
          <Link to="/login">Iniciar Sesión</Link>
          <Link to="/registro">Registrarse</Link>
          </div>
        }
          
        </div>}
      </div>
      </div>
    </header>
  );
}
