import { authController } from '@/controllers';
import BaseRouter from './base.route';

class AuthRouter extends BaseRouter {
  routes(): void {
    this.router.post('/login', authController.login);
  }
}

export default new AuthRouter().router;
