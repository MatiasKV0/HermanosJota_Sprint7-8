import express from "express";

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
  .post(postProduct);

productsRouter
  .route("/:id")
  .get(getProduct)
  .put(putProduct)
  .delete(deleteProduct);

export default productsRouter;
