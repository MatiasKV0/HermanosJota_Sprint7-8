import { useState } from "react";
import ProductosRender from "./ProductosRender";
import { useData } from "../../context/DataContext";

export default function ProductosContainer() {
  const { productos, loading, error } = useData();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const productosFiltrados = productos.filter((p) => {
    const coincideCategoria =
      !categoriaSeleccionada || p.categoria === categoriaSeleccionada;
    const coincideTexto =
      textoBusqueda.trim() === "" ||
      p.nombre.toLowerCase().includes(textoBusqueda.toLowerCase());
    return coincideCategoria && coincideTexto;
  });

  return (
    <ProductosRender
      data={productosFiltrados || []}
      loading={loading}
      response={error}
      setCategoriaSeleccionada={setCategoriaSeleccionada}
      textoBusqueda={textoBusqueda}
      setTextoBusqueda={setTextoBusqueda}
    />
  );
}
