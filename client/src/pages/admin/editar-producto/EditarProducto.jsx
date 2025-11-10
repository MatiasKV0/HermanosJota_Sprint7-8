import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormProducto from "../components/FormProducto";
import { useData } from "../../../context/DataContext";
import { actualizarProducto } from "../../../data/db";

export default function EditarProducto() {
  const { id } = useParams();
  const { getProductoById } = useData();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    let alive = true;

    const fetchProducto = async () => {
      const p = await getProductoById(id);
      if (alive) setProducto(p);
      console.log(p);
    };

    fetchProducto();

    return () => {
      alive = false;
    };
  }, [id, getProductoById]);

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <FormProducto
      initialData={producto}
      onSubmit={(data) => actualizarProducto(id, data)}
    />
  );
}
