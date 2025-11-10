export default function NavCategorias({ setCategoriaSeleccionada }) {
  const categorias = [
    { key: "productos", label: "PRODUCTOS" },
    { key: "silla", label: "SILLAS" },
    { key: "sillon", label: "SILLONES" },
    { key: "mesa", label: "MESAS" },
    { key: "escritorio", label: "ESCRITORIOS" },
    { key: "biblioteca", label: "BIBLIOTECAS" },
    { key: "cama", label: "CAMAS" }
  ];

  return (
    <nav>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {categorias.map((cat) => (
          <li
            key={cat.key}
            style={{
              cursor: "pointer"
            }}
            onClick={() => {
              if (cat.key === "productos") {
                setCategoriaSeleccionada(null);
              } else {
                setCategoriaSeleccionada(cat.key);
              }
            }}
          >
            {cat.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}
