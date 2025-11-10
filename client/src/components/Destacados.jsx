import { Link } from "react-router-dom";
import { useData } from "../context/DataContext";

import "./destacados.css";
import "../pages/home/home.css";

export default function Destacados() {
  const { productos, loading, error } = useData();

  if (loading) return <p className="msg">Cargando productos destacados...</p>;
  if (error) return <p className="msg">{error}</p>;
  if (!productos.length) return <p className="msg">No hay productos destacados.</p>;

  const start = Math.floor(Math.random() * (productos.length - 3));
  const destacados = productos.slice(start, start + 3);

  return (
    <div className="destacados-content">
      {destacados.map((producto, index) => (
        <Link to={'/producto/'+producto._id} key={index}>
          <img src={producto.imagenUrl} alt={producto.nombre} />
        </Link>
      ))}
    </div>
  );
}
