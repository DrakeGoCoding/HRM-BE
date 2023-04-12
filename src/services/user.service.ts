import User, { OMIT_USER_ATTRIBUTES, UserAttributes } from '../models/user';
import { BaseService } from './base.service';

class UserService extends BaseService<User, UserAttributes> {
  constructor() {
    super(User, OMIT_USER_ATTRIBUTES);
  }
}

export default new UserService();
