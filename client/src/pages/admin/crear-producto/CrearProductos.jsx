import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";

import FormProducto from "../components/FormProducto";
import { crearProducto } from "../../../data/db";

export default function CrearProducto() {
  const navigate = useNavigate();
  const { auth, loading } = useAuth();

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

  return (
    <FormProducto
      onSubmit={(data) => crearProducto(data)}
    />
  );
}
