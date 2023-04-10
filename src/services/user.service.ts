import { BaseService } from '.';
import User from '../models/user';

export class UserService extends BaseService<User> {
  getModel() {
    return User;
  }
  async create(user: User): Promise<User> {
    try {
      const newUser = await User.create({
        email: user.username,
        password: user.password
      });
      return newUser;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }
}
