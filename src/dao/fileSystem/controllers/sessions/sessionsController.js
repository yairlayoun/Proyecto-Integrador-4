import * as sessionsService from "../services/sessionsService.js";
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/sessionsController.log' })
  ],
});

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await sessionsService.loginUser(email, password);

    if (user) {
      req.session.user = { id: user._id, email: user.email, first_name: user.first_name };
      res.json({ message: 'Inicio de sesión exitoso' });
      logger.info(`Inicio de sesión exitoso - Usuario: ${user.email}`);
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
      logger.warn(`Intento de inicio de sesión fallido - Usuario: ${email}`);
    }
  } catch (error) {
    console.error("Error en loginUser controller", error);
    res.status(500).json({ error: 'Error al iniciar sesión', message: error.message });
    logger.error(`Error al iniciar sesión - ${error.message}`);
  }
};
