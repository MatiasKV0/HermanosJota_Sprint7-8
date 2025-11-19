import { useAuth } from "../../../context/AuthContext";
import { useState, useEffect } from "react";

export default function Registro() {
  const { registrar } = useAuth();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");

  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState(false);
  const [mensajeBackend, setMensajeBackend] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;

  const validar = () => {
    let erroresTemp = {};

    if (!nombre.trim()) {
      erroresTemp.nombre = "El nombre es obligatorio";
    } else if (!nombreRegex.test(nombre)) {
      erroresTemp.nombre =
        "Nombre inválido (solo letras y espacios, 2-50 caracteres)";
    }

    if (!email.trim()) {
      erroresTemp.email = "El email es obligatorio";
    } else if (!emailRegex.test(email)) {
      erroresTemp.email = "Ingrese un email válido";
    }

    if (!password.trim()) {
      erroresTemp.password = "La contraseña es obligatoria";
    } else if (password.length < 6) {
      erroresTemp.password = "La contraseña debe tener mínimo 6 caracteres";
    }

    if (!confirmarPassword.trim()) {
      erroresTemp.confirmarPassword =
        "Debe confirmar su contraseña";
    } else if (password !== confirmarPassword) {
      erroresTemp.confirmarPassword = "Las contraseñas no coinciden";
    }

    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeBackend("");

    if (!validar()) return;

    try {
      await registrar({ nombre, email, password });
      setExito(true);

      setNombre("");
      setEmail("");
      setPassword("");
      setConfirmarPassword("");
      setErrores({});
    } catch (error) {
      setMensajeBackend(error.message || "Error al registrar usuario");
    }
  };

  useEffect(() => {
    if (exito) {
      const timer = setTimeout(() => setExito(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [exito]);

  return (
    <>
      <h1>Registro</h1>

      <form onSubmit={handleSubmit} noValidate>
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={errores.nombre ? "input-error" : ""}
        />
        <span className="error-message">{errores.nombre}</span>

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

        <label>Confirmar contraseña:</label>
        <input
          type="password"
          value={confirmarPassword}
          onChange={(e) => setConfirmarPassword(e.target.value)}
          className={errores.confirmarPassword ? "input-error" : ""}
        />
        <span className="error-message">{errores.confirmarPassword}</span>

        <button type="submit" disabled={exito}>
          Registrarse
        </button>

        {mensajeBackend && (
          <div className="error-message" style={{ marginTop: "10px" }}>
            {mensajeBackend}
          </div>
        )}

        {exito && (
          <div className="success-message" style={{ marginTop: "15px" }}>
            ¡Registro exitoso! Ya podés iniciar sesión.
          </div>
        )}
      </form>
    </>
  );
}
