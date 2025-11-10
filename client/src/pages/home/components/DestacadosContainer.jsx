import { Link } from "react-router-dom"
import Destacados from "../../../components/Destacados"

export default function DestacadosContainer() {
  return (
    <section id="destacados" className="destacados">
      <h2>Piezas Destacadas</h2>
      
      <Destacados />
  
      <Link to="/productos" className="btn-secondary">
        Explorar más creaciones
      </Link>
    </section>
  )
}
