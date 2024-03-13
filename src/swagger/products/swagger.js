// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const productOptions = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Productos API',
      version: '2.0',
      description: 'Documentación para el módulo de productos.',
    },
  },
  apis: ["../../dao/fileSystem/controllers/products/*.js"],
};

const productSpecs = swaggerJsdoc(productOptions);

export const setupProductSwagger = (app) => {
  app.use('/api-docs/products', swaggerUiExpress.serve, swaggerUiExpress.setup(productSpecs));
};

