import express from "express";
import {verificarAuth, verificarAdmin} from "../middleware/auth.js";

import {
  getAllProducts,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
} from "../controllers/productsController.js";

const productsRouter = express.Router();

productsRouter
  .route("/")
  .get(getAllProducts)
  .post(verificarAuth, verificarAdmin, postProduct);

productsRouter
  .route("/:id")
  .get(getProduct)
  .put(verificarAuth, verificarAdmin, putProduct)
  .delete(verificarAuth, verificarAdmin, deleteProduct);

export default productsRouter;
