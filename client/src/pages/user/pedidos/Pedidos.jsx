import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Pedidos.css";


export default function Pedidos() {
  const { auth, loading, obtenerPedidos } = useAuth();
  const navigate = useNavigate();

  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    if (!loading && !auth) navigate("/");
  }, [loading, auth, navigate]);

  const fetchPedidos = async () => {
    try {
      const data = await obtenerPedidos();
      setPedidos(data.pedidos);
    } catch (error) {
      console.error("Error al obtener pedidos:", error);
    }
  };
  fetchPedidos();

  if (loading) return <div className="loading-screen">Cargando...</div>;
  if (!auth) return null;

  return (
    <div className="pedidos-page">
      <div className="pedidos-container fade-in">

        <div className="page-header">
          <h1>Historial de Pedidos</h1>
        </div>

        {pedidos.length === 0 ? (
          <div className="empty-state-modern">
            <h2>Aún no tienes pedidos</h2>
            <button className="btn-modern primary" onClick={() => navigate("/productos")}>
              Ver productos
            </button>
          </div>
        ) : (
          <div className="pedidos-grid">
            {pedidos.map((pedido) => (
              <div key={pedido._id} className="pedido-card-modern">

                <div className="card-top">
                  <div>
                    <div className="order-id">{pedido.id}</div>
                    <div className="order-date">{(new Date(pedido.createdAt)).toLocaleDateString()}</div>
                  </div>
                  <span className={`status-badge status-${pedido.estado}`}>
                    {pedido.estado}
                  </span>
                </div>

                <div className="card-body">
                  <div className="items-preview">
                    {pedido.items.map((item, index) => (
                      <div key={index} className="item-row">
                        <span>{item.cantidad}x {item.nombre}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card-footer">
                  <div>
                    <div className="total-label">Total</div>
                    <div className="total-amount">${pedido.total.toLocaleString("es-AR")}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}