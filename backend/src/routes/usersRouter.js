import express from "express";
import {verificarAuth} from "../middleware/auth.js";

import {
  registrarUsuario,
  loginUsuario,
  obtenerUsuario
} from "../controllers/usersController.js";

const usersRouter = express.Router();
  
usersRouter
  .route("/registro")
  .post(registrarUsuario);

usersRouter
  .route("/login")
  .post(loginUsuario);

usersRouter
  .route("/perfil")
  .get(verificarAuth, obtenerUsuario);

export default usersRouter;
