import { Link } from "react-router-dom";

import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <div>
          <div>
            <ul>
              <li>Sitio web: www.hermanosjota.com.ar</li>
              <li>Email general: info@hermanosjota.com.ar</li>
              <li>Ventas: ventas@hermanosjota.com.ar</li>
              <li>Instagram: @hermanosjota_ba</li>
              <li>WhatsApp: +54 11 4567-8900</li>
            </ul>
          </div>
        </div>
        <div>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/productos">Productos</Link>
            </li>
            <li>
              <Link to="/contacto">Contacto</Link>
            </li>
          </ul>
        </div>
        <div>
          <ul>
            <li>Hermanos Jota — Casa Taller</li>
            <li>Av. San Juan 2847</li>
            <li>C1232AAB — Barrio de San Cristóbal</li>
            <li>Ciudad Autónoma de Buenos Aires</li>
            <li>Argentina</li>
            <br />
            <li>Horarios:</li>
            <li>Lunes a Viernes: 10:00 - 19:00</li>
            <li>Sábados: 10:00 - 14:00</li>
          </ul>
        </div>
      </div>
      <div>
        <p>© 2025 Hermanos Jota. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
