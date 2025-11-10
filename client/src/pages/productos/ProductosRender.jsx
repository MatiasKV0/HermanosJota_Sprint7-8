import "./productos.css";
import NavCategorias from "./components/NavCategorias";
import ListaProductos from "./components/ListaProductos";

export default function ProductosRender({
  data,
  loading,
  response,
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  textoBusqueda,
  setTextoBusqueda,
  onAgregarProducto,
}) {
  return (
    <main className="productos">
      <div className="productos__layout">
        <aside className="productos__aside">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="search"
              placeholder="Buscar..."
              value={textoBusqueda}
              onChange={(e) => setTextoBusqueda(e.target.value)}
            />
          </form>
          <NavCategorias
            setCategoriaSeleccionada={setCategoriaSeleccionada}
          />
          <button type="button" onClick={onAgregarProducto} className="productos__btn" aria-label="Agregar nuevo producto">
            Agregar nuevo producto
          </button>
        </aside>

        <section>
          <div>
            <h1>Productos</h1>
            <ListaProductos
              data={data}
              loading={loading}
              response={response}
            />
          </div>
        </section>
      </div>
    </main>
  );
}