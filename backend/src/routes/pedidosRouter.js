import express from "express";
import {verificarAuth, verificarAdmin} from "../middleware/auth.js";

import {
  obtenerPedidos, realizarPedido
} from "../controllers/pedidosController.js";

const pedidosRouter = express.Router();
  
pedidosRouter
  .route("/")
  .get(verificarAuth, obtenerPedidos)
  .post(verificarAuth, realizarPedido);

export default pedidosRouter;