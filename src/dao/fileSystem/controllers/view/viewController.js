import { renderProfileView } from '../../../../views/viewView.js';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/viewController.log' })
  ],
});

const profileView = (req, res) => {
  try {
    const user = req.session.user;

    if (!user) {
      // Si el usuario no está autenticado, redirige al login u otra acción
      logger.warn('Intento de acceder a la vista de perfil sin autenticación');
      return res.redirect('/login');
    }

    const viewData = renderProfileView(user);
    res.render(viewData.view, { user: viewData.user });
    logger.info(`Vista de perfil mostrada para el usuario: ${user.email}`);
  } catch (error) {
    console.error("Error en profileView controller", error);
    res.status(500).json({ error: 'Error al mostrar la vista de perfil', message: error.message });
    logger.error(`Error al mostrar la vista de perfil - ${error.message}`);
  }
};

export { profileView };
