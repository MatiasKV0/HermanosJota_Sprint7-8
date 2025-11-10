import Producto from "../models/Producto.js";
import mongoose from "mongoose";

const getAllProducts = async (req, res, next) => {
  try {
    const productos = await Producto.find();
    res.status(200).json({
      total: productos.length,
      productos,
    });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("ID inválido");
      error.status = 400;
      return next(error);
    }

    const product = await Producto.findById(id);

    if (!product) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({ product });
  } catch (error) {
    next(error);
  }
};

const postProduct = async (req, res, next) => {
  try {
    const producto = new Producto(req.body);
    const productoGuardado = await producto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    console.error("Error al crear producto:", error.message);
    if (!error.status) error.status = 400;
    next(error);
  }
};

const putProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const datosActualizados = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("ID inválido");
      error.status = 400;
      return next(error);
    }

    const productoActualizado = await Producto.findByIdAndUpdate(
      id,
      datosActualizados,
      { new: true, runValidators: true }
    );

    if (!productoActualizado) {
      const error = new Error("Producto no encontrado para actualizar");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({
      mensaje: "Producto actualizado con éxito",
      producto: productoActualizado,
    });
  } catch (error) {
    console.error("Error al actualizar producto:", error.message);
    if (!error.status) error.status = 500;
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("ID inválido");
      error.status = 400;
      return next(error);
    }

    const productoEliminado = await Producto.findByIdAndDelete(id);

    if (!productoEliminado) {
      const error = new Error("Producto no encontrado");
      error.status = 404;
      return next(error);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export { getAllProducts, getProduct, postProduct, putProduct, deleteProduct };
