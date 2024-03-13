// productsRouter.js
import express from "express";
import { isAdmin } from '../middlewares/authMiddleware.js';
import * as productsController from "../dao/fileSystem/controllers/products/productsController.js";

const router = express.Router();

// Ruta para obtener todos los productos
router.get("/", async (req, res) => {
  await productsController.getProducts(req, res);
});

// Ruta para obtener un producto por ID
router.get("/:productId", async (req, res) => {
  await productsController.getProductById(req, res);
});

// Ruta para agregar un nuevo producto (sólo permitido para administradores)
router.post("/", isAdmin, async (req, res) => {
  await productsController.addProduct(req, res);
});

// Ruta para actualizar un producto (sólo permitido para administradores)
router.put("/:productId", isAdmin, async (req, res) => {
  await productsController.updateProduct(req, res);
});

// Ruta para eliminar un producto (sólo permitido para administradores)
router.delete("/:productId", isAdmin, async (req, res) => {
  await productsController.deleteProduct(req, res);
});

export default router;
