import { Link } from "react-router-dom";

export default function ListaProductos({ data, loading, response }) {
  return (
    <div
      id="productos__container"
    >
      {loading && <p className="msg">Cargando productos...</p>}
      {response && <p className="msg">{response}</p>}
      {!loading && !response && data.length === 0 && (
        <p className="msg">No hay productos para mostrar.</p>
      )}
      {!loading &&
        !response &&
        data.map((p) => (
          <Link
            key={p._id}
            to={`/producto/${p._id}`}
          >
            <img
              src={`${p.imagenUrl}`}
              alt={p.nombre}
              loading="lazy"
            />
          </Link>
        ))}
    </div>
  );
}
