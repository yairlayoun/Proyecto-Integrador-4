import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

// Definir la configuración de Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Carritos',
      version: '1.0.0',
      description: 'Documentación para el módulo de carritos.',
    },
  },
  apis: ["../../dao/fileSystem/controllers/carts/cartsController.js"],
};

// Crear el objeto Swagger
const swaggerSpec = swaggerJsDoc(options);

export const setupCartSwagger = (app) => {
  app.use('/api-docs/cart', swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerSpec));
};

export default swaggerSpec;
