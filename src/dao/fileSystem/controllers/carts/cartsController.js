import * as cartsService from "../../../../services/cartService.js";
import * as ticketsService from "../../../services/ticketsService.js";
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/carts.log' })
  ],
});

export const getCarts = async (req, res) => {
  try {
    const carts = await cartsService.getCarts();
    res.json(carts);
    logger.info('Obtenidos todos los carritos');
  } catch (error) {
    console.error("Error en getCarts controller", error);
    logger.error(`Error al obtener carritos: ${error.message}`);
    res.status(500).json({ error: "Error al obtener carritos", message: error.message });
  }
};

export const getCartById = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await cartsService.getCartById(cartId);
    if (!cart) {
      logger.warn(`Intento de obtener un carrito no existente: ${cartId}`);
      return res.status(404).json({ error: "Carrito no encontrado" });
    }
    res.json(cart);
    logger.info(`Obtenido carrito por ID: ${cartId}`);
  } catch (error) {
    console.error("Error en getCartById controller", error);
    logger.error(`Error al obtener el carrito: ${error.message}`);
    res.status(500).json({ error: "Error al obtener el carrito", message: error.message });
  }
};

export const createCart = async (req, res) => {
  try {
    const newCart = await cartsService.createCart();
    res.status(201).json(newCart);
    logger.info('Creado un nuevo carrito');
  } catch (error) {
    console.error("Error en createCart controller", error);
    logger.error(`Error al crear el carrito: ${error.message}`);
    res.status(500).json({ error: "Error al crear el carrito", message: error.message });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;
    const result = await cartsService.addProductToCart(cartId, productId, quantity);
    if (!result) {
      logger.warn(`Intento de agregar producto a un carrito no existente: ${cartId}`);
      return res.status(404).json({ error: "Carrito no encontrado" });
    }
    res.json({ message: "Producto agregado al carrito exitosamente" });
    logger.info(`Producto agregado al carrito - Carrito ID: ${cartId}, Producto ID: ${productId}`);
  } catch (error) {
    console.error("Error en addProductToCart controller", error);
    logger.error(`Error al agregar producto al carrito: ${error.message}`);
    res.status(500).json({ error: "Error al agregar producto al carrito", message: error.message });
  }
};

export const purchaseCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const purchaseResult = await cartsService.purchaseCart(cartId);
    
    if (purchaseResult.success) {
      const ticketData = {
        code: generateUniqueCode(),
        purchase_datetime: new Date(),
        amount: purchaseResult.totalAmount,
        purchaser: req.session.user.email,
        products: purchaseResult.purchasedProducts,
      };
      
      const ticket = await ticketsService.createTicket(ticketData);

      const remainingProducts = purchaseResult.failedProducts.map(product => product.productId);
      await cartsService.updateCartProducts(cartId, remainingProducts);

      res.json({ success: true, ticketId: ticket._id });
      logger.info(`Compra exitosa - Carrito ID: ${cartId}`);
    } else {
      res.json({ success: false, failedProducts: purchaseResult.failedProducts });
      logger.warn(`Compra fallida - Carrito ID: ${cartId}`);
    }
  } catch (error) {
    console.error(`Error en purchaseCart controller: ${error.message}`);
    logger.error(`Error al realizar la compra: ${error.message}`);
    res.status(500).json({ error: 'Error al realizar la compra', message: error.message });
  }
};

function generateUniqueCode() {
  const timestamp = Date.now().toString(36);
  const randomNum = Math.floor(Math.random() * 1000).toString(36);
  return `${timestamp}-${randomNum}`;
}
