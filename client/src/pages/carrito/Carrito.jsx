import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useData } from "../../context/DataContext";

import Destacados from "../../components/Destacados";
import ItemCart from "./components/itemCart";

import "./carrito.css";

export default function Carrito() {
  const { cart, clearCart } = useCart();
  const { productos, loading: dataLoading, error: dataError } = useData();

  const [carritoCompleto, setCarritoCompleto] = useState([]);
  const [success, setSuccess] = useState(false);
  const [precioTotal, setPrecioTotal] = useState(0);

  useEffect(() => {
    if (productos.length > 0 && cart.length > 0) {
      const filtrado = cart
        .map((item) => {
          const prod = productos.find((p) => p._id === item.id);
          return prod ? { ...prod, quantity: item.quantity } : null;
        })
        .filter(Boolean);

      setCarritoCompleto(filtrado);

      const total = filtrado.reduce(
        (acc, p) => acc + p.precio * p.quantity,
        0
      );
      setPrecioTotal(total);
    } else {
      setCarritoCompleto([]);
      window.scrollTo(0, 0);
    }
  }, [cart, productos]);

  const handleClick = () => {
    clearCart();
    setSuccess(true);
    window.scrollTo(0, 0);
  };

  if (dataLoading) return <p className="msg">Cargando carrito...</p>;
  if (dataError) return <p className="msg">{dataError}</p>;

  return (
    <main className="cart">
      <h1>Tu Carrito</h1>
      <p className="cart-intro">
        Cada pieza seleccionada es una inversión en la belleza y funcionalidad de tu hogar
      </p>

      <section className="cart-container">
        <div className="cart-items" id="cart-items">
          {success ? (
            <h2>
              Pago realizado con éxito.<br/>
              Total abonado: ${precioTotal.toLocaleString("es-AR")} <br/>
              ¡Gracias por confiar en nosotros!
            </h2>
          ) : carritoCompleto.length === 0 ? (
            <h2 className="empty-cart">El carrito está vacío.</h2>
          ) : (
            <ul>
              {carritoCompleto.map((item) => (
                <ItemCart item={item} key={item._id} />
              ))}
            </ul>
          )}
        </div>

        {carritoCompleto.length > 0 && !success && (
          <div className="cart-summary">
            <h3>¿Listo para finalizar tu compra?</h3>
            <p>Total: ${precioTotal.toLocaleString("es-AR")}</p>
            <p>Revisa los productos de tu carrito y procede al pago de manera segura.</p>
            <button className="checkout" id="cotizar" onClick={handleClick}>
              Pagar Ahora
            </button>
          </div>
        )}
      </section>

      <section className="more-products">
        <h2>También te puede interesar</h2>
        <div className="products-container" id="products-container">
          <Destacados />
        </div>
      </section>
    </main>
  );
}
