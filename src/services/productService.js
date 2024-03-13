// productsService.js
import Product from "../dao/models/product.model.js";

export const getProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    console.error("Error al obtener productos desde la base de datos", error);
    return [];
  }
};

export const getProductById = async (productId) => {
  try {
    const product = await Product.findById(productId);
    return product;
  } catch (error) {
    console.error("Error al obtener un producto por su ID desde la base de datos", error);
    return null;
  }
};

export const addProduct = async (newProduct) => {
  try {
    const createdProduct = await Product.create(newProduct);
    return createdProduct;
  } catch (error) {
    console.error("Error al agregar un nuevo producto en la base de datos", error);
    throw new Error('Error al agregar el producto', error);
  }
};

export const updateProduct = async (productId, updatedProductData) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, updatedProductData, { new: true });
    return updatedProduct;
  } catch (error) {
    console.error("Error al actualizar un producto en la base de datos", error);
    throw new Error('Error al actualizar el producto', error);
  }
};

export const deleteProduct = async (productId) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    return deletedProduct !== null;
  } catch (error) {
    console.error("Error al eliminar un producto de la base de datos", error);
    throw new Error('Error al eliminar el producto', error);
  }
};
