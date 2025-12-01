import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";

import Destacados from "../../components/Destacados";
import ItemCart from "./components/itemCart";

import "./carrito.css";

export default function Carrito() {
  const { cart, clearCart, createPedido } = useCart();
  const { productos, loading: dataLoading, error: dataError } = useData();
  
  const { auth } = useAuth(); 

  const navigate = useNavigate();

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
    }
  }, [cart, productos]);

  const handleClick = async () => {
    if(auth){
      let token = localStorage.getItem("token");
      await createPedido({ items: cart, total: precioTotal, estado: "pagado", token });
      clearCart();
      setSuccess(true);
      window.scrollTo(0, 0);
    }
    else{
      navigate("/login", { state: { from: "/carrito" } });
    }
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
            <div className="success-message-cart"> 
                <h2>Pago realizado con éxito.</h2>
                <p>Total abonado: ${precioTotal.toLocaleString("es-AR")}</p>
                <p>¡Gracias por confiar en nosotros!</p>
                <button className="checkout" onClick={() => navigate("/mis-pedidos")}>Ver mis pedidos</button>
            </div>
          ) : carritoCompleto.length === 0 ? (
            <div className="empty-cart-container">
                <h2 className="empty-cart">El carrito está vacío.</h2>
                <button className="checkout" onClick={() => navigate("/productos")}>Ir a comprar</button>
            </div>
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
            <p className="total-price">Total: ${precioTotal.toLocaleString("es-AR")}</p>
            <p>Revisa los productos de tu carrito y procede al pago de manera segura.</p>
            
            {auth ? (
              <button className="checkout" id="cotizar" onClick={handleClick}>
                Pagar Ahora
              </button>
            ) : (
              <button className="checkout secondary" id="cotizar" onClick={handleClick}>
                Iniciar sesión para pagar
              </button>
            )}

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