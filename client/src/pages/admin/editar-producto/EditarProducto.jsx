import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useData } from "../../../context/DataContext";
import { useAuth } from "../../../context/AuthContext";

import { actualizarProducto } from "../../../data/db";

import FormProducto from "../components/FormProducto";

export default function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getProductoById } = useData();
  const { auth, loading } = useAuth();

  const [producto, setProducto] = useState(null);

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
    if (!loading && !auth) {
      navigate("/");
    }
  }, [loading, auth]);

  if (!auth) return null;
  if (auth.rol !== 'admin') {
    navigate("/");
  }
  if (loading) return <p className="msg">Cargando...</p>;
  if (!producto) return <p className="msg">Error al cargar el producto.</p>;

  return (
    <FormProducto
      initialData={producto}
      onSubmit={(data) => actualizarProducto(id, data)}
    />
  );
}
