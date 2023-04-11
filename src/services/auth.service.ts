import User from '@/models/user';
import Authentication from '@/utils/auth';
import AppError from '@/utils/error';
import { AppResponse } from '@/utils/types';

export interface IAuthService {
  login(
    username: string,
    password: string
  ): Promise<
    AppResponse<{
      token: string;
      user: User;
    }>
  >;
}

class AuthService implements IAuthService {
  async login(
    username: string,
    password: string
  ): Promise<
    AppResponse<{
      token: string;
      user: User;
    }>
  > {
    const user = await User.findOne({
      where: {
        username: username
      }
    });
    if (!user) {
      throw new AppError({
        code: 400,
        message: 'Invalid username or password'
      });
    }

    const isPasswordValid = Authentication.comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new AppError({
        code: 400,
        message: 'Invalid username or password'
      });
    }

    return {
      data: {
        token: Authentication.generateToken({
          role: user.role,
          userId: user.id,
          username: user.username
        }),
        user
      },
      code: 200
    };
  }
}

export default new AuthService();
