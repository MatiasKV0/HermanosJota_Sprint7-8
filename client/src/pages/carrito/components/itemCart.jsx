import { useCart } from "../../../context/CartContext";
import { Link } from "react-router-dom";

export default function ItemCart({item},index) {
  const { updateQuantity, removeFromCart } = useCart();

  const precioTotal = item.precio * item.quantity;

  return (
    <div className="cart-item" key={index}>
      <img
        src={`${item.imagenUrl}`}
        alt={item.nombre}
        className="item-image"
      />

      <Link className="item-details" to={`/producto/${item._id}`}>
        <h3 className="item-name">{item.nombre}</h3>
        <p className="item-description">{item.descripcion}</p>
      </Link>

      <div className="item-price">
        <p className="price-unit">
          ${item.precio.toLocaleString("es-AR")} c/u
        </p>
        <p className="price-total">
          ${precioTotal.toLocaleString("es-AR")}
        </p>
      </div>

      <div className="item-actions">
        <div className="quantity-controls">
          <button
            className="quantity-btn minus"
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
          >
            -
          </button>
          <div>{item.quantity}</div>
          <button
            className="quantity-btn plus"
            onClick={() => updateQuantity(item._id, item.quantity + 1)}
          >
            +
          </button>
        </div>

        <button
          className="remove-btn"
          onClick={() => removeFromCart(item._id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
