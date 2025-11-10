import { Link } from "react-router-dom"

export default function Reviews() {
  return (
    <section id="reviews" className="reviews">
      <h2>Voces de Nuestra Comunidad</h2>
      <div className="reviews-content">
        <blockquote>
          <p>
            Cada pieza envejece con gracia, desarrollando carácter mientras
            mantiene su belleza esencial.
          </p>
          <cite>— María P.</cite>
        </blockquote>
        <blockquote>
          <p>
            La calidez y la intencionalidad se sienten desde el primer
            momento. Arte que funciona.
          </p>
          <cite>— Juan L.</cite>
        </blockquote>
      </div>
      <Link to="/contacto" className="btn-secondary">
        Déjanos tu opinión
      </Link>
    </section>
  )
}
