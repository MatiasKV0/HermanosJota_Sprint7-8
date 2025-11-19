import { useAuth } from "../../../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const { auth, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !auth) {
      navigate("/");
    }
  }, [loading, auth]);

  if (loading) return <div>Cargando...</div>;

  if (!auth) return <div>Para ver tu perfil, por favor inicia sesión.</div>;

  return (
    <div>Perfil</div>
  )
}
