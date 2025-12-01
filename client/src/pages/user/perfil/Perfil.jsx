import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Perfil.css";

export default function Perfil() {
  const { auth, loading, logout, obtenerPedidos } = useAuth();
  const navigate = useNavigate();

  const [cantPedidos, setCantPedidos] = useState(0);

  useEffect(() => {
    if (!loading && !auth) {
      navigate("/");
    }
  }, [loading, auth, navigate]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión", error);
    }
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  const getCantPedidos = async () => {
    try {
      let token = localStorage.getItem("token");
      const pedidos = await obtenerPedidos(token);
      setCantPedidos(pedidos.total);
    } catch (error) {
      console.error("Error al obtener pedidos", error);
      setCantPedidos(0);
    }
  };

  useEffect(() => {
    getCantPedidos();
  }, []);

  if (loading) return <div className="loading-screen">Cargando...</div>;
  if (!auth) return null;

  return (
    <div className="perfil-page">
      <div className="perfil-container fade-in">

        <aside className="perfil-sidebar">
          <div className="sidebar-card">
            <div className="avatar-container">
              {auth.photoURL ? (
                <img src={auth.photoURL} alt="Avatar" className="avatar-img" />
              ) : (
                <div className="avatar-placeholder">
                  {getInitials(auth.nombre)}
                </div>
              )}
              <span className="status-indicator"></span>
            </div>

            <h1 className="user-name">{auth.nombre || "Usuario"}</h1>
            <p className="user-email">{auth.email}</p>

            <div className="sidebar-actions">
              <button className="btn-modern primary">Editar Perfil</button>
              <button className="btn-modern secondary">Cambiar Password</button>
              <button onClick={handleLogout} className="btn-modern danger">
                Cerrar Sesión
              </button>
            </div>
          </div>
        </aside>

        <main className="perfil-content">

          <div className="stats-grid">
            <div className="stat-modern">
              <div className="stat-icon">📦</div>
              <div className="stat-data">
                <span className="stat-value">{cantPedidos}</span>
                <span className="stat-label">Pedidos</span>
              </div>
            </div>
            <div className="stat-modern">
              <div className="stat-icon">❤️</div>
              <div className="stat-data">
                <span className="stat-value">0</span>
                <span className="stat-label">Favoritos</span>
              </div>
            </div>
            <div className="stat-modern">
              <div className="stat-icon">📍</div>
              <div className="stat-data">
                <span className="stat-value">0</span>
                <span className="stat-label">Direcciones</span>
              </div>
            </div>
          </div>

          <div className="details-card">
            <div className="card-header">
              <h2>Información Personal</h2>
            </div>

            <div className="info-grid">
              <div className="info-group">
                <label>Nombre</label>
                <p>{auth.nombre}</p>
              </div>
              <div className="info-group">
                <label>Correo</label>
                <p>{auth.email || "No registrado"}</p>
              </div>
              <div className="info-group">
                <label>Fecha Registro</label>
                <p>{auth.createdAt ? (new Date(auth.createdAt)).toLocaleDateString() : "N/A"}</p>
              </div>
            </div>
          </div>

          <div className="details-card">
            <div className="card-header">
              <h2>Preferencias</h2>
            </div>
            <div className="toggles-list">
              <div className="toggle-item">
                <span>Recibir notificaciones por email</span>
                <div className="toggle-switch active"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}