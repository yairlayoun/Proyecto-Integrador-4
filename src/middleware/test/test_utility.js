// tu_utilidad_de_pruebas.js

import Cart from '../../../models/carts.model.js';
import Product from "../dao/models/product.model.js";

// Función para configurar la base de datos de prueba
export async function setupDatabase() {
    try {

      await Cart.create({ _id: 'tu_id_de_prueba', /* otros campos */ });
      await Product.create({ _id: 'tu_id_de_prueba_producto', /* otros campos */ });
    } catch (error) {
      console.error('Error configurando la base de datos de prueba:', error);
      throw error;
    }
  }
  
  // Función para limpiar la base de datos de prueba
  export async function clearDatabase() {
    try {

      await Cart.deleteMany({});
      await Product.deleteMany({});
    } catch (error) {
      console.error('Error limpiando la base de datos de prueba:', error);
      throw error;
    }
  }
  