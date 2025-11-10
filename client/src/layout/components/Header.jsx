import { Link, useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext"; 
import "./header.css";

export default function Header() {
  const { cart } = useCart();
  const location = useLocation();

  const total = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

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
      <Link to="carrito" id="carrito-icon">
        {location.pathname !== "/carrito" && total > 0 && total < 100 && (
          <span id="carrito-total" style={{ padding: "3px" }}>{total}</span>
        )}
        {location.pathname !== "/carrito" && total > 99 && (
          <span id="carrito-total" style={{ padding: "0px" }}>+99</span>
        )}
        <img src="/img/cart.svg" alt="Carrito de Compras" />
      </Link>
    </header>
  );
}
