import { authService } from '@/services';
import { NextFunction, Request, Response } from 'express';

export interface IAuthController {
  login(req: Request, res: Response, next: NextFunction): Promise<void>;
}

class AuthController implements IAuthController {
  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { username = '', password = '' } = req.body;
      const { code, data } = await authService.login(username, password);
      res.cookie('access_token', data.token).status(code).json(data);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
