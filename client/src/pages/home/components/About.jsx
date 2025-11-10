import React from 'react'

export default function About() {
  return (
     <section id="about" className="about-us">
        <h2>Nuestra Historia</h2>
        <p>
          Existimos en la intersección entre herencia e innovación, donde la
          calidez del optimismo de los años 60 se encuentra con la conciencia de
          la sustentabilidad del 2025. Cada pieza que creamos no solo sirve una
          función, sino que alimenta el alma, honrando el pasado mientras abraza
          el futuro.
        </p>

        <h2>Compromiso de Longevidad</h2>
        <div className="cards">
          <div className="card">
            <h3>Garantía extendida</h3>
            <p>10 años en estructura, 5 años en acabados</p>
          </div>
          <div className="card">
            <h3>Servicio de restauración</h3>
            <p>Recuperamos y renovamos piezas antiguas</p>
          </div>
          <div className="card">
            <h3>Taller de cuidados</h3>
            <p>Capacitación gratuita para clientes</p>
          </div>
          <div className="card">
            <h3>Recompra garantizada</h3>
            <p>Hasta 40% del valor en piezas bien cuidadas</p>
          </div>
          <div className="card">
            <h3>Certificado de trazabilidad</h3>
            <p>Origen de cada material utilizado</p>
          </div>
        </div>
      </section>
  )
}
