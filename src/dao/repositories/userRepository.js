// dao/repositories/userRepository.js
import UserDAO from '../daos/userDAO.js';

class UserRepository {
  async getUserByEmail(email) {
    return UserDAO.getUserByEmail(email);
  }

  async createUser(user) {
    return UserDAO.createUser(user);
  }

  // Puedes agregar más métodos según sea necesario para interactuar con el DAO
}

export default new UserRepository();
