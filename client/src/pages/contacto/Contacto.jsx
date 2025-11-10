import "./contacto.css";
import ContactoForm from "./components/ContactoForm";
import ContactoInfo from "./components/ContactoInfo";
import ContactoMapa from "./components/ContactoMapa";

export default function Contacto() {
  return (
    <main className="contacto">
      <h1>Conectemos</h1>
      <p>
        Cada conversación es el inicio de una pieza única. Compartí tu visión y
        creemos juntos muebles que alimenten el alma de tu hogar.
      </p>

      <section id="contact-section">
        <div className="contact-form-container">
          <ContactoForm />
        </div>

        <div className="contact-info-container">
          <ContactoInfo />
        </div>
      </section>

      <section id="map-section">
        <ContactoMapa />
      </section>
    </main>
  );
}
