import Usuario from "../models/Usuario.js";
import mongoose from "mongoose";

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("ID inválido");
      error.status = 400;
      return next(error);
    }

    const usuario = await Usuario.findById(id);

    if (!usuario) {
      const error = new Error("Usuario no encontrado");
      error.status = 404;
      return next(error);
    }

    res.status(200).json({ usuario });
  } catch (error) {
    next(error);
  }
};

const postUser = async (req, res, next) => {
  try {
    const usuario = new Usuario(req.body);
    const usuarioGuardado = await usuario.save();
    res.status(201).json(usuarioGuardado);
  } catch (error) {
    console.error("Error al crear usuario:", error.message);
    if (!error.status) error.status = 400;
    next(error);
  }
};

export { getUser, postUser };
