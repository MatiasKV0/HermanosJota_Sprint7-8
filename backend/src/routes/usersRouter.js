import express from "express";

import {
  postUser,
  getUser
} from "../controllers/usersController.js";

const usersRouter = express.Router();
  
usersRouter
  .route("/")
  .get(getUser)
  .post(postUser);

export default usersRouter;
