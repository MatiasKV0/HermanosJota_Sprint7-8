import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const verificarAuth = async (req, res, next) => {
  const auth = req.headers.authorization;

  if (!auth || !auth.startsWith("Bearer")) {
    return res.status(401).json({ msg: "No autorizado" });
  }

  const token = auth.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = await Usuario.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token inválido" });
  }
};

const verificarAdmin = (req, res, next) => {
  if (!req.usuario) {
    return res.status(401).json({ msg: "No autenticado" });
  }

  if (req.usuario.rol !== "admin") {
    return res.status(403).json({ msg: "Acceso denegado: se requiere rol de administrador" });
  }

  next();
};

export { verificarAuth, verificarAdmin };
