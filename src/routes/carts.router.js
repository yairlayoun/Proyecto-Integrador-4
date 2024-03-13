// cartsRouter.js
import express from "express";
import * as cartsController from "../dao/fileSystem/controllers/carts/cartsController.js";

const router = express.Router();

router.get("/", async (req, res) => {
  await cartsController.getCarts(req, res);
});

router.get("/:cartId", async (req, res) => {
  await cartsController.getCartById(req, res);
});

router.post("/", async (req, res) => {
  await cartsController.createCart(req, res);
});

router.post("/:cartId/add-product/:productId", async (req, res) => {
  await cartsController.addProductToCart(req, res);
});

router.post('/:cartId/purchase', async (req, res) => {
  await cartsController.purchaseCart(req, res);

  try {
    // Lógica para finalizar la compra y corroborar el stock
    const result = await cartsController.purchaseCart(cartId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al finalizar la compra', message: error.message });
  }
});

export default router;
