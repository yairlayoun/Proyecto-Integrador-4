// persistence/dao.factory.js
import MongoUserDao from './mongo/user.dao.js'; // Asumiendo que tenemos DAO específicos para MongoDB

class DaoFactory {
  static createDao(daoType) {
    switch (daoType) {
      case 'mongo':
        return new MongoUserDao();
      // Puedes agregar más tipos de DAO según sea necesario
      default:
        throw new Error('Tipo de DAO no soportado');
    }
  }
}

export default DaoFactory;
