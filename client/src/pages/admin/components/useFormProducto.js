import { useState, useEffect } from "react";
import { useData } from "../../../context/DataContext";
import { useNavigate } from "react-router-dom";

export default function useFormProducto(initialData = null, onSubmit) {
  const { reloadProductos } = useData();

  const navigate = useNavigate();

  const initialForm = {
    nombre: "",
    descripcion: "",
    imagenUrl: "",
    precio: "",
    categoria: "seleccionar",
    stock: "",

    atributos: {
      medidas: "",
      materiales: "",
      estructura: "",
      caracteristicas: "",
      color: "",
    },
  };

  const [form, setForm] = useState(() => {
    if (!initialData) return initialForm;
    return {
      ...initialForm,
      ...initialData,
      atributos: {
        ...initialForm.atributos,
        ...(initialData.atributos || {}),
      },
    };
  });

  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const nombreRegex = /^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s.,'-]{2,100}$/;
  const imagenRegex = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;

  const validar = () => {
    let erroresTemp = {};
    if (!form.nombre.trim()) {
      erroresTemp.nombre = "El nombre es obligatorio";
    } else if (!nombreRegex.test(form.nombre)) {
      erroresTemp.nombre =
        "Ingrese un nombre válido (solo letras, números y espacios)";
    }
    if (!form.descripcion.trim()) {
      erroresTemp.descripcion = "La descripción es obligatoria";
    } else if (form.descripcion.length < 10) {
      erroresTemp.descripcion =
        "La descripción debe tener al menos 10 caracteres";
    }
    if (!form.imagenUrl.trim()) {
      erroresTemp.imagenUrl = "La URL de la imagen es obligatoria";
    } else if (!imagenRegex.test(form.imagenUrl)) {
      erroresTemp.imagenUrl =
        "Ingrese una URL válida que termine en .jpg, .png, etc.";
    }
    if (!form.precio && form.precio !== 0) {
      erroresTemp.precio = "El precio es obligatorio";
    } else if (Number(form.precio) <= 0) {
      erroresTemp.precio = "El precio debe ser mayor que 0";
    }
    if (form.categoria === "seleccionar") {
      erroresTemp.categoria = "Seleccione una categoría";
    }
    if (form.stock === "") {
      erroresTemp.stock = "El stock es obligatorio";
    } else if (Number(form.stock) < 0) {
      erroresTemp.stock = "El stock no puede ser negativo";
    }
    setErrores(erroresTemp);
    return Object.keys(erroresTemp).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validar()) {
      const atributosCompletos = Object.entries(form.atributos || {}).reduce(
        (acc, [key, value]) => {
          if (value != null && String(value).trim() !== "") acc[key] = value;
          return acc;
        },
        {}
      );

      const producto = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        imagenUrl: form.imagenUrl,
        precio: Number(form.precio),
        categoria: form.categoria,
        stock: Number(form.stock),
        atributos: atributosCompletos,
      };

      try {
        await onSubmit(producto);
        setExito(`Producto "${form.nombre}" guardado correctamente.`);
        setErrores({});
        if (!initialData) {
          setForm(initialForm);
        } else {
          setForm((prev) => ({
            ...prev,
            ...producto,
            atributos: atributosCompletos,
          }));
        }
        reloadProductos();
      } catch (error) {
        console.error(error);
        setErrores({ general: "Ocurrió un error al guardar el producto." });
      }
    }
    else{
      setExito("");
      setErrores((prev) => ({...prev, general: "Por favor corrija los errores del formulario."}) );
      setTimeout(() => {
        setErrores((prev) => {
          const {[ "general" ]: _, ...rest} = prev;
          return rest;
        });
      }, 3000);
    }
  };

  useEffect(() => {
    if (exito) {
      const clearMsg = setTimeout(() => setExito(""), 2000);
      const goTo = setTimeout(() => navigate("/productos"), 2000);

      return () => {
        clearTimeout(clearMsg);
        clearTimeout(goTo);
      };
    }
  }, [exito]);

  return { form, setForm, errores, exito, handleChange, handleSubmit };
}
