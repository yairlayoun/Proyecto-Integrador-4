// persistence/mongo/user.dao.js
import User from '../../models/user.model.js';

class MongoUserDao {
  async getAllUsers() {
    return await User.find();
  }

  async getUserById(userId) {
    return await User.findById(userId);
  }

  async createUser(userData) {
    return await User.create(userData);
  }

  async updateUser(userId, userData) {
    return await User.findByIdAndUpdate(userId, userData, { new: true });
  }

  async deleteUser(userId) {
    return await User.findByIdAndDelete(userId);
  }
}

export default MongoUserDao;
