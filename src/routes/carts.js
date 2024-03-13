import express from 'express';
import * as cartsController from '../dao/fileSystem/controllers/cartsController.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const newCart = await cartsController.createCart();
  res.status(201).json({ message: 'Nuevo carrito creado', cartId: newCart.id });
});

router.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  const cart = await cartsController.getCartById(cartId);
  if (!cart) {
    res.status(404).json({ error: 'Carrito no encontrado' });
  } else {
    res.json({ cartId, products: cart.products });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = parseInt(req.params.pid);
  const quantity = req.body.quantity || 1;

  const result = await cartsController.addProductToCart(cartId, productId, quantity);
  if (result) {
    res.json({ message: `Producto ${productId} agregado al carrito ${cartId}` });
  } else {
    res.status(404).json({ error: 'Carrito o producto no encontrado' });
  }
});

export default router;
