import FormProducto from "../components/FormProducto";
import { crearProducto } from "../../../data/db";

export default function CrearProducto() {

  return (
    <FormProducto
      onSubmit={(data) => crearProducto(data)}
    />
  );
}
