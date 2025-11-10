import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (producto, quantity = 1) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === producto._id);
      const stock = producto.stock ?? 0;
      if (found) {
        const newQuantity = Math.min(found.quantity + quantity, stock);
        return prev.map((p) =>
          p.id === producto._id ? { ...p, quantity: newQuantity } : p
        );
      }
      return [
        ...prev,
        { id: producto._id, quantity: Math.min(quantity, stock), stock },
      ];
    });
  };

  const updateQuantity = (productId, newQuantity, stock) => {
    if (newQuantity < 1) return;
    setCart((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, quantity: Math.min(newQuantity, stock ?? p.stock) }
          : p
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
