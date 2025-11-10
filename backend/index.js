import dotenv from "dotenv";
dotenv.config({ quiet: true });

import express from "express";
import cors from "cors";

import corsOptions from "./src/config/corsConfig.js";
import conectarDB from "./src/config/db.js";

import productsRouter from "./src/routes/productsRouter.js";
import logger from "./src/middleware/logger.js";
import errorHandler from "./src/middleware/errorHandler.js";
import notFound from "./src/middleware/notFound.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(logger);

app.use("/api/productos", productsRouter);

app.use(notFound);
app.use(errorHandler);

conectarDB()
  .then(() => {
    console.log("Base de Datos conectada");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error.message);
    process.exit(1);
  });
