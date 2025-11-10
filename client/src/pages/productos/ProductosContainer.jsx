import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductosRender from "./ProductosRender";
import { useData } from "../../context/DataContext";

export default function ProductosContainer() {
  const { productos, loading, error } = useData();
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const navigate = useNavigate();

  const productosFiltrados = productos.filter((p) => {
    const coincideCategoria =
      !categoriaSeleccionada || p.categoria === categoriaSeleccionada;
    const coincideTexto =
      textoBusqueda.trim() === "" ||
      p.nombre.toLowerCase().includes(textoBusqueda.toLowerCase());
    return coincideCategoria && coincideTexto;
  });

  const handleAgregarProducto = () => {
    navigate("/admin/crear-producto");
  };

  return (
    <ProductosRender
      data={productosFiltrados || []}
      loading={loading}
      response={error}
      categoriaSeleccionada={categoriaSeleccionada}
      setCategoriaSeleccionada={setCategoriaSeleccionada}
      textoBusqueda={textoBusqueda}
      setTextoBusqueda={setTextoBusqueda}
      onAgregarProducto={handleAgregarProducto}
    />
  );
}
