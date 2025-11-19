import Usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";

const registrarUsuario = async (req, res, next) => {
  try {
    const usuarioExiste = await Usuario.findOne({ email: req.body.email });
    if (usuarioExiste)
      return res.status(400).json({ msg: "El email ya está registrado" });

    req.body.rol = "user";

    const usuario = new Usuario(req.body);
    await usuario.save();

    res.status(201).json({
      msg: "Usuario registrado con éxito",
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    next(error);
  }
};

const loginUsuario = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email: email.toLowerCase() }).select("+password");
    if (!usuario)
      return res.status(400).json({ msg: "Credenciales incorrectas" });

    const passwordCorrecto = await usuario.compararPassword(password);
    if (!passwordCorrecto)
      return res.status(400).json({ msg: "Credenciales incorrectas" });

    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      msg: "Login exitoso",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
    });
  } catch (error) {
    next(error);
  }
};


const obtenerUsuario = async (req, res, next) => {
  try {
    const usuario = req.usuario;
    res.json({ id: usuario._id, nombre: usuario.nombre, email: usuario.email });
  } catch (error) {
    next(error);
  } 
};

export { registrarUsuario, loginUsuario, obtenerUsuario };