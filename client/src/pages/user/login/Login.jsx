import { useAuth } from "../../../context/AuthContext";
import { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import "./login.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errores, setErrores] = useState({});
  const [mensajeBackend, setMensajeBackend] = useState("");
  const [exito, setExito] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validar = () => {
    const erroresTemp = {};

    if (!email.trim()) {
      erroresTemp.email = "El email es obligatorio";
    } else if (!emailRegex.test(email)) {
      erroresTemp.email = "Ingrese un email válido";
    }

    if (!password.trim()) {
      erroresTemp.password = "La contraseña es obligatoria";
    } else if (password.length < 6) {
      erroresTemp.password = "Debe tener mínimo 6 caracteres";
    }

    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeBackend("");

    if (!validar()) return;

    try {
      const respuesta = await login({ email, password });

      setExito(true);
      setEmail("");
      setPassword("");
      setErrores({});
      navigate("/perfil");
    } catch (error) {
      setMensajeBackend(error.message || "Error en el login");
    }
  };

  useEffect(() => {
    if (exito) {
      const timer = setTimeout(() => setExito(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [exito]);

  return (
    <main className="login">
      <section className="login-card">
        <h1>Iniciar sesión</h1>
        <form onSubmit={handleSubmit} noValidate className="login-form">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errores.email ? "input-error" : ""}
          />
          <span className="error-message">{errores.email}</span>

          <label>Contraseña:</label>
          <input
           type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errores.password ? "input-error" : ""}
          />
          <span className="error-message">{errores.password}</span>

          <button type="submit" disabled={exito}>
            Iniciar sesión
          </button>

          {mensajeBackend && (
            <div className="error-message" style={{ marginTop: "10px" }}>
              {mensajeBackend}
            </div>
          )}

          {exito && (
            <div className="success-message" style={{ marginTop: "15px" }}>
              ¡Inicio de sesión exitoso! Redirigiendo...
            </div>
          )}
        </form>
      </section>
    </main>
  );
}
