import Cart from '../../../models/carts.model.js';
import Product from '../../../models/product.model.js';
import { customizeError } from "../middleware/errors/handle.errors.js";
import { errorMessages } from "../middleware/errors/error.dictionary.js";

// Función para obtener todos los carritos desde la base de datos con Mongoose
export const getCarts = async () => {
  try {
    const carts = await Cart.find(); // Consulta a la base de datos para obtener todos los carritos
    return carts;
  } catch (error) {
    return [];
  }
};

// Función para obtener un carrito por su ID desde la base de datos con Mongoose
export const getCartById = async (cartId) => {
  try {
    const cart = await Cart.findById(cartId); // Consulta a la base de datos para obtener un carrito por su ID
    return cart;
  } catch (error) {
    return null;
  }
};

// Función para crear un nuevo carrito en la base de datos con Mongoose
export const createCart = async () => {
  try {
    const newCart = await Cart.create({ products: [] }); // Crear un nuevo carrito en la base de datos
    return newCart;
  } catch (error) {
    throw new Error('Error al crear el carrito', error);
  }
};

// Función para agregar un producto a un carrito en la base de datos con Mongoose
export const addProductToCart = async (cartId, productId, quantity) => {
  try {
    const cart = await Cart.findById(cartId); // Encontrar el carrito por su ID
    if (!cart) {
      return false;
    }

    const existingProduct = cart.products.find((item) => item.productId == productId);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }


      if (productoNoExiste) {
        throw customizeError('PRODUCT_NOT_FOUND', errorMessages.PRODUCT_NOT_FOUND);
      }
  

      if (stockInsuficiente) {
        throw customizeError('INSUFFICIENT_STOCK', errorMessages.INSUFFICIENT_STOCK);
      }

    await cart.save(); // Guardar el carrito actualizado en la base de datos
    return true;
  } catch (error) {
    throw new Error('Error al agregar producto al carrito', error);
  }
};


export const purchaseCart = async (cartId) => {
  try {
    const cart = await Cart.findById(cartId).populate('products.productId');
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    // Verificar el stock de cada producto en el carrito
    for (const cartProduct of cart.products) {
      const availableStock = cartProduct.productId.stock;
      const requestedQuantity = cartProduct.quantity;

      if (availableStock >= requestedQuantity) {
        // Restar la cantidad del stock y actualizar la base de datos
        cartProduct.productId.stock -= requestedQuantity;
        await cartProduct.productId.save();
      } else {
        // No hay suficiente stock, puedes manejar esto según tus requisitos
        throw new Error(`Stock insuficiente para el producto: ${cartProduct.productId}`);
      }
    }

    // Realizar otras operaciones necesarias para finalizar la compra, si las hay

    // Limpiar el carrito después de la compra
    cart.products = [];
    await cart.save();

    return { message: 'Compra realizada exitosamente' };
  } catch (error) {
    throw new Error(`Error al realizar la compra: ${error.message}`);
  }
};