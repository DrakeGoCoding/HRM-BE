import Helper from '@/utils/helper';
import { AppResponse } from '@/utils/types';
import User, { OMIT_USER_ATTRIBUTES, UserAttributes } from '../models/user';
import { BaseService } from './base.service';

class UserService extends BaseService<User, UserAttributes> {
  getModel() {
    return User;
  }

  async create(payload: UserAttributes): Promise<AppResponse<User>> {
    const newUser = await User.create(
      Helper.omit(payload, OMIT_USER_ATTRIBUTES)
    );
    return {
      data: newUser,
      code: 201
    };
  }
}

export default new UserService();
