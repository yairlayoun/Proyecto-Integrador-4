import express from "express";
import usersController from "../dao/fileSystem/controllers/user/userController.js";
import { addLogger, getLogger } from './path/to/logger.js';

const router = (app) => {
  app.use("/users", usersController);
};

router.get("/", (req, res) => {
  let data = {
    layout: "nofound",
  };
  res.render("index", data);
});

router.get('/loggerTest', addLogger, (req, res) => {
  try {
    req.logger.debug('Esto es un mensaje de debug');
    req.logger.info('Esto es un mensaje de info');
    req.logger.warn('Esto es un mensaje de advertencia');
    req.logger.error('Esto es un mensaje de error');

    res.json({ message: 'Prueba de logs realizada con éxito' });
  } catch (error) {
    req.logger.error(`Error en /loggerTest: ${error.message}`);
    res.status(500).json({ error: 'Error en /loggerTest', message: error.message });
  }
});

export default router;
