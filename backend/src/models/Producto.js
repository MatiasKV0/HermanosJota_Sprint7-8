import mongoose from "mongoose";

const productoSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      trim: true,
    },
    imagenUrl: {
      type: String,
      required: true,
    },
    precio: {
      type: Number,
      required: true,
      min: 0,
    },
    atributos: {
      type: Object, 
      default: {}, 
    },
    categoria: {
      type: String,
    },
    stock:{
      type: Number,
      required: true,
      min: 0,
    }
  },
  {
    timestamps: true,
  }
);

const Producto = mongoose.model("Producto", productoSchema);

export default Producto;
