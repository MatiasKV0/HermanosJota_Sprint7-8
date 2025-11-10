import { useState, useEffect } from "react";

export default function ContactoForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;

  const validar = () => {
    let erroresTemp = {};

    if (!nombre.trim()) {
      erroresTemp.nombre = "El nombre es obligatorio";
    } else if (!nombreRegex.test(nombre)) {
      erroresTemp.nombre =
        "Ingrese un nombre válido (solo letras y espacios, 2-50 caracteres)";
    }

    if (!email.trim()) {
      erroresTemp.email = "El email es obligatorio";
    } else if (!emailRegex.test(email)) {
      erroresTemp.email = "Ingrese un email válido";
    }

    if (!mensaje.trim()) {
      erroresTemp.mensaje = "El mensaje es obligatorio";
    } else if (mensaje.length < 5) {
      erroresTemp.mensaje = "El mensaje debe tener al menos 5 caracteres";
    } else if (mensaje.length > 500) {
      erroresTemp.mensaje = "El mensaje no puede exceder 500 caracteres";
    }

    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validar()) {
      console.log("Formulario enviado:", { nombre, email, mensaje });
      setExito(true);

      setNombre("");
      setEmail("");
      setMensaje("");
      setErrores({});
    }
  };

  useEffect(() => {
    if (exito) {
      const timer = setTimeout(() => setExito(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [exito]);


  return (
    <form id="contactForm" onSubmit={handleSubmit} noValidate>
      <label htmlFor="NombreUsuario">Nombre:</label>
      <input
        type="text"
        id="NombreUsuario"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className={errores.nombre ? "input-error" : ""}
      />
      <span className="error-message">{errores.nombre}</span>

      <label htmlFor="EmailUsuario">Email:</label>
      <input
        type="email"
        id="EmailUsuario"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={errores.email ? "input-error" : ""}
      />
      <span className="error-message">{errores.email}</span>

      <label htmlFor="MensajeUsuario">Mensaje:</label>
      <textarea
        id="MensajeUsuario"
        rows="5"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        className={errores.mensaje ? "input-error" : ""}
      />
      <span className="error-message">{errores.mensaje}</span>

      <button type="submit" disabled={exito}>Enviar Mensaje</button>

      {exito && (
        <div id="successMessage" className="success-message">
          ¡Mensaje enviado con éxito! <br />
          Pronto nos pondremos en contacto contigo.
        </div>
      )}
    </form>
  );
}
