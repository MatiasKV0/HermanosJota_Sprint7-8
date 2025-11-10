import "./FormProducto.css";
import useFormProducto from "./useFormProducto";
import AtributosForm from "./AtributosForm";

export default function FormProducto({ initialData, onSubmit }) {
  const { form, errores, exito, handleChange, handleSubmit } =
    useFormProducto(initialData, onSubmit);

  return (
    <main className="main__formProducto">
      <h1>{initialData ? "Editar producto" : "Agregar nuevo producto"}</h1>
      <form className="formProducto" onSubmit={handleSubmit} noValidate>
        <label>Nombre*</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          className={errores.nombre ? "input-error" : ""}
        />
        <span className="error-message">{errores.nombre}</span>

        <label>Descripción*</label>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          className={errores.descripcion ? "input-error" : ""}
        ></textarea>
        <span className="error-message">{errores.descripcion}</span>

        <label>URL de la imagen*</label>
        <input
          type="text"
          name="imagenUrl"
          value={form.imagenUrl}
          onChange={handleChange}
          className={errores.imagenUrl ? "input-error" : ""}
        />
        <span className="error-message">{errores.imagenUrl}</span>

        <label>Precio*</label>
        <input
          type="number"
          name="precio"
          value={form.precio}
          min="1"
          onChange={handleChange}
          className={errores.precio ? "input-error" : ""}
        />
        <span className="error-message">{errores.precio}</span>

        <label>Categoría*</label>
        <select
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          className={errores.categoria ? "input-error" : ""}
        >
          <option value="seleccionar" disabled>
            Seleccione una categoría
          </option>
          <option value="biblioteca">Biblioteca</option>
          <option value="cama">Cama</option>
          <option value="escritorio">Escritorio</option>
          <option value="mesa">Mesa</option>
          <option value="silla">Silla</option>
          <option value="sillon">Sillón</option>
        </select>
        <span className="error-message">{errores.categoria}</span>

        <label>Stock*</label>
        <input
          type="number"
          name="stock"
          min="0"
          value={form.stock}
          onChange={handleChange}
          className={errores.stock ? "input-error" : ""}
        />
        <span className="error-message">{errores.stock}</span>

        <AtributosForm form={form} handleChange={handleChange} />

        <button type="submit" disabled={exito}>
          {initialData ? "Guardar cambios" : "Agregar Producto"}
        </button>
        {exito && <div className="success-message">{exito}</div>}
        {errores.general && (
          <div className="error-message">{errores.general}</div>
        )}
      </form>
    </main>
  );
}
