import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useData } from "../../context/DataContext";
import { eliminarProducto } from "../../data/db";
import "./producto.css";

export default function Producto() {
  const { id } = useParams();
  const { cart, addToCart, removeFromCart } = useCart();
  const { getProductoById, loading: dataLoading, error: dataError, reloadProductos } = useData();

  const [producto, setProducto] = useState(null);
  const [qty, setQty] = useState(1);
  const [disponible, setDisponible] = useState(true);
  const [stockRestante, setStockRestante] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let alive = true;
    const fetchProducto = async () => {
      const p = await getProductoById(id);
      if (alive) setProducto(p);
    };
    fetchProducto();
    return () => {
      alive = false;
    };
  }, [id, getProductoById]);

  useEffect(() => {
    if (!producto) return;
    const stock = producto.stock ?? 0;
    setQty(stock > 0 ? 1 : 0);
  }, [producto]);

  useEffect(() => {
    if (!producto) return;

    const productoEnCarrito = cart.find(p => p.id === producto._id || p._id === producto._id);
    const cantidadEnCarrito = productoEnCarrito ? productoEnCarrito.quantity : 0;

    const stockDisponible = producto.stock ?? 0;
    const restante = stockDisponible - cantidadEnCarrito;

    setStockRestante(restante);
    setDisponible(restante > 0);
    
    setQty(prev => {
      if (restante === 0) return 0;
      if (prev > restante) return restante;
      if (prev < 1) return 1;
      return prev;
    });
  }, [cart, producto]);

  if (dataLoading) return <p className="msg">Cargando...</p>;
  if (dataError) return <p className="msg">{dataError}</p>;
  if (!producto) return <p className="msg">Producto no encontrado.</p>;

  const { nombre, atributos, precio, descripcion, imagenUrl } = producto;

  const handleClick = () => {
    if (!disponible || qty < 1 || qty > stockRestante) return;
    addToCart(producto, qty);
    navigate("/carrito");
  };

  const handleClickDelete = async () => {
    const confirmado = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
    if (!confirmado) return;
    try {
      removeFromCart(producto._id);
      navigate("/productos");
      await eliminarProducto(producto._id);
      await reloadProductos();
    } catch (error) {
      alert("Error al eliminar el producto. Inténtalo de nuevo.");
    }
  };

  const handleClickEdit = () => {
    removeFromCart(producto._id);
    navigate(`/admin/editar-producto/${producto._id}`);
  };

  return (
    <main className="producto">
      <section className="producto">
        <div className="producto__media">
          <figure className="producto__figure">
            <img id="p-img" src={imagenUrl} alt={nombre} loading="lazy" />
          </figure>
        </div>

        <div className="producto__info">
          <h1 id="p-nombre" className="producto__titulo">{nombre}</h1>

          <div className="producto__panel">
            <p id="p-descripcion" className="producto__descripcion">{descripcion}</p>
          </div>

          <div className="producto__cantidad">
            <div className="producto__precio">
              <span
                id="p-available"
                style={{ color: disponible ? "var(--colorsecundario)" : "var(--colorprimario)" }}
              >
                {disponible
                  ? "Stock disponible"
                  : "Sin stock"}
              </span>
              <h2 id="p-price">${Number(precio)?.toLocaleString("es-AR")}</h2>
            </div>

            <div className="cantidad__control">
              <input
                type="number"
                id="cantidad"
                name="cantidad"
                value={qty}
                min={stockRestante > 0 ? 1 : 0}
                max={stockRestante}
                className="cantidad-input"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    const num = value === "" ? 0 : Number(value);
                    if (num > stockRestante) setQty(stockRestante);
                    else setQty(num);
                  }
                }}
              />

              <button
                id="carrito"
                className="btn btn--primario"
                onClick={handleClick}
                disabled={!disponible || qty < 1 || qty > stockRestante}
              >
                Añadir al carrito
              </button>
            </div>

            <div className="cantidad__control">
              <button className="btn btn--edit" onClick={handleClickEdit}>
                Editar producto
              </button>
              <button className="btn btn--delete" onClick={handleClickDelete}>
                Eliminar producto
              </button>
            </div>
          </div>

          {atributos && (
            <div className="producto__panel">
              <dl id="p-atributos" className="atributos">
                {Object.entries(atributos).map(([k, v]) => (
                  <div key={k} className="atributo__item">
                    <dt className="atributo__key">{k}</dt>
                    <dd className="atributo__value">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
