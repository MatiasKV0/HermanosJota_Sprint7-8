import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import "./header.css";

export default function Header() {
  const { cart } = useCart();
  const { auth, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const total = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const handleUserClick = () => {
    setShowUserMenu(!showUserMenu);
    setIsMobileMenuOpen(false); 
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setShowUserMenu(false); 
  };

  const closeAllMenus = () => {
    setShowUserMenu(false);
    setIsMobileMenuOpen(false);
  };

  const handleCerrarSesion = () => {
    logout();
    closeAllMenus();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">

        <Link to="/" className="logo-container" onClick={closeAllMenus}>
          <img src="/img/logo.svg" alt="Mueblería Hermanos Jota Logo" />
        </Link>

        <nav className={`navbar ${isMobileMenuOpen ? "active" : ""}`}>
          <ul className="nav-links">
            <li><Link to="/" onClick={closeAllMenus}>Inicio</Link></li>
            <li><Link to="/productos" onClick={closeAllMenus}>Productos</Link></li>
            <li><Link to="/contacto" onClick={closeAllMenus}>Contacto</Link></li>
          </ul>
        </nav>

        <div className="header-actions">
          
          {/* CARRITO */}
          <Link to="carrito" className="cart-icon-container" onClick={closeAllMenus}>
            {location.pathname !== "/carrito" && total > 0 && (
              <span className="cart-badge">
                {total > 99 ? "+99" : total}
              </span>
            )}
            <img src="/img/cart.svg" alt="Carrito" />
          </Link>

          <div className="user-dropdown-container">
            <div className="user-icon" onClick={handleUserClick}>
              <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>

            {showUserMenu && (
              <div className="dropdown-menu fade-in">
                {auth ? (
                  <>
                    <div className="dropdown-header">Hola, {auth.nombre || "Usuario"}</div>
                    <Link to="/perfil" onClick={closeAllMenus}>Perfil</Link>
                    <Link to="/mis-pedidos" onClick={closeAllMenus}>Mis Pedidos</Link>
                    {auth.rol === "admin" && <Link to="/admin/dashboard" onClick={closeAllMenus}>Dashboard</Link>}
                    <button onClick={handleCerrarSesion} className="btn-logout">Cerrar Sesión</button>
                  </>
                ) : (
                  <>
                    <Link to="/login" onClick={closeAllMenus}>Iniciar Sesión</Link>
                    <Link to="/registro" onClick={closeAllMenus}>Registrarse</Link>
                  </>
                )}
              </div>
            )}
          </div>

          <button className="hamburger-btn" onClick={toggleMobileMenu}>
             <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {isMobileMenuOpen ? (
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                ) : (
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                )}
                {isMobileMenuOpen && <line x1="6" y1="6" x2="18" y2="18"></line>}
                {!isMobileMenuOpen && <line x1="3" y1="6" x2="21" y2="6"></line>}
                {!isMobileMenuOpen && <line x1="3" y1="18" x2="21" y2="18"></line>}
             </svg>
          </button>

        </div>
      </div>
    </header>
  );
}