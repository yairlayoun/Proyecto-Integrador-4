import mongoose from "mongoose";
import "dotenv/config.js";

const dbURI = process.env.DB_URI; // Asegúrate de tener esta variable de entorno configurada

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on(
  "error",
  console.error.bind(console, "Error de conexión a la base de datos:")
);
db.once("open", () => {
  console.log("Conectado a la base de datos");
});

export { mongoose, db };
