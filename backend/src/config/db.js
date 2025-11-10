import mongoose from "mongoose";

const conectarDB = () => {
  return mongoose.connect(process.env.MONGO_URI)
    .then((db) => {
      console.log(`MongoDB conectado en: ${db.connection.host}:${db.connection.port}`);
      return db;
    });
};

export default conectarDB;
