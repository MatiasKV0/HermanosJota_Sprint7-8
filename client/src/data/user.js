const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export async function CrearUsuario(data) {
  const res = await fetch(`${BASE_URL}/api/users/registro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Error al crear usuario");
  return res.json();
}

export async function Login(data) {
  const res = await fetch(`${BASE_URL}/api/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Credenciales incorrectas");
  return res.json();
}

export async function ObtenerPerfil(token) {
  const res = await fetch(`${BASE_URL}/api/users/perfil`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("No se pudo obtener el perfil");
  return res.json();
}

export async function ObtenerPedidos(token) {
  const res = await fetch(`${BASE_URL}/api/pedidos`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("No se pudieron obtener los pedidos");
  return res.json();
}

