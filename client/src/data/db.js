const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export async function getProductos() {
  try {
    const res = await fetch(`${BASE_URL}/api/productos`);
    if (!res.ok) {
      throw new Error(`Error al obtener productos: ${res.status}`);
    }

    const data = await res.json();

    return Array.isArray(data) ? data : data.productos || [];
  } catch (error) {
    console.error("Error en getProductos:", error);
    throw error;
  }
}

export async function getProductoPorId(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/productos/${id}`);
    if (!res.ok) {
      throw new Error(`Error al obtener producto: ${res.status}`);
    }

    const data = await res.json();
    return data.product || null;
  } catch (error) {
    console.error("Error en getProductoPorId:", error);
    throw error;
  }
}

export async function crearProducto(producto) {
  try {
    const res = await fetch(`${BASE_URL}/api/productos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    });

    if (!res.ok) throw new Error(`Error al crear producto: ${res.status}`);

    return await res.json();
  } catch (error) {
    console.error("Error en crearProducto:", error);
    throw error;
  }
}

export async function actualizarProducto(id, data) {
  try {
    const res = await fetch(`${BASE_URL}/api/productos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error(`Error al actualizar producto: ${res.status}`);

    return await res.json();
  } catch (error) {
    console.error("Error en actualizarProducto:", error);
    throw error;
  }
}

export async function eliminarProducto(id) {
  try {
    const res = await fetch(`${BASE_URL}/api/productos/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error(`Error al eliminar producto: ${res.status}`);

    return true;
  } catch (error) {
    console.error("Error en eliminarProducto:", error);
    throw error;
  }
}
