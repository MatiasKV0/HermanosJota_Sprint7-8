import { Link } from "react-router-dom";

export default function Hero() {

  return (
    <section id="hero" className="hero">
        <div className="hero-content">
          <h1>Hermanos Jota</h1>
          <p>
            Cada pieza cuenta la historia de manos expertas y materiales nobles
          </p>
          <Link to="/productos" className="btn-primary">
            Descubrir Colección
          </Link>
        </div>
        <img
          src={"https://raw.githubusercontent.com/MatiasKV0/imgHermanosJota/refs/heads/main/AparadorUspallata.png"}
          alt="Aparador artesanal Hermanos Jota"
          className="hero-img"
        />
      </section>
  )
}
