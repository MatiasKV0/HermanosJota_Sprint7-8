export default function ContactoMapa() {
  return (
    <div className="map-container">
      <h2>Visitanos en nuestro showroom</h2>
      <p>
        Te esperamos en San Cristóbal para que conozcas de cerca nuestro proceso
        artesanal y sientas la calidad de nuestros materiales. Nuestro showroom
        está abierto de lunes a viernes de 10:00 a 19:00 y los sábados de 10:00
        a 14:00.
      </p>
      <div className="map-iframe">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.217000325707!2d-58.4073485244753!3d-34.62395615856696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccae2a0c04a2f%3A0x77f381af8f0ca1fa!2sAv.%20San%20Juan%202847%2C%20C1232AAK%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1756263438572!5m2!1ses-419!2sar"
          width="100%"
          height="350"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación showroom Hermanos Jota"
        ></iframe>
      </div>
    </div>
  );
}
