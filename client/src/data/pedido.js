import { getProductoPorId } from "./db";
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export async function CrearPedido(data) {

  const items = await Promise.all(data.items.map(async (item) => {
    const productData = await getProductoPorId(item.id);
    return {
      producto: item.id,
      nombre: productData.nombre,
      precio: productData.precio,
      subtotal: productData.precio * item.quantity,
      cantidad: item.quantity
    };
  }));

  let pedidoData = {
    items,
    total: data.total,
    estado: data.estado
  }

  const res = await fetch(`${BASE_URL}/api/pedidos`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${data.token}`},
    body: JSON.stringify(pedidoData),
  });

  if (!res.ok) throw new Error("Error al crear pedido");
  return res.json();
}

export async function ObtenerPedidos(token) {
  const res = await fetch(`${BASE_URL}/api/pedidos`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("No se pudieron obtener los pedidos");
  return res.json();
}


