import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Nombre de tu API',
      version: '1.0.0',
      description: 'Descripción de tu API',
    },
  },
  apis: ['./ruta/de/tus/controladores/*.js'],
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
};
