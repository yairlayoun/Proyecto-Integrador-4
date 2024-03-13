import DaoFactory from '../persistence/dao.factory.js';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/mainController.log' })
  ],
});

class MainController {
  constructor() {
    this.userDao = DaoFactory.createDao('mongo'); // Puedes cambiar 'mongo' por el tipo de DAO que desees
  }

  async getAllUsers(req, res) {
    try {
      const users = await this.userDao.getAllUsers();
      res.json(users);
      logger.info('Obtenidos todos los usuarios');
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios', message: error.message });
      logger.error(`Error al obtener usuarios: ${error.message}`);
    }
  }

  async getUserById(req, res) {
    try {
      const userId = req.params.id;
      const user = await this.userDao.getUserById(userId);
      if (!user) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        logger.warn(`Intento de obtener usuario no existente - ID: ${userId}`);
      } else {
        res.json(user);
        logger.info(`Obtenido usuario por ID: ${userId}`);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuario', message: error.message });
      logger.error(`Error al obtener usuario por ID: ${error.message}`);
    }
  }

  async createUser(req, res) {
    try {
      const userData = req.body;
      const newUser = await this.userDao.createUser(userData);
      res.status(201).json(newUser);
      logger.info('Creado un nuevo usuario');
    } catch (error) {
      res.status(400).json({ error: 'Datos de usuario inválidos', message: error.message });
      logger.error(`Error al crear un nuevo usuario: ${error.message}`);
    }
  }

  async updateUser(req, res) {
    try {
      const userId = req.params.id;
      const updatedUserData = req.body;
      const updatedUser = await this.userDao.updateUser(userId, updatedUserData);
      if (!updatedUser) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        logger.warn(`Intento de actualizar usuario no existente - ID: ${userId}`);
      } else {
        res.json(updatedUser);
        logger.info(`Usuario actualizado - ID: ${userId}`);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar usuario', message: error.message });
      logger.error(`Error al actualizar usuario - ID: ${error.message}`);
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const result = await this.userDao.deleteUser(userId);
      if (!result) {
        res.status(404).json({ error: 'Usuario no encontrado' });
        logger.warn(`Intento de eliminar usuario no existente - ID: ${userId}`);
      } else {
        res.status(204).end();
        logger.info(`Usuario eliminado - ID: ${userId}`);
      }
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar usuario', message: error.message });
      logger.error(`Error al eliminar usuario - ID: ${error.message}`);
    }
  }
}

export default MainController;
