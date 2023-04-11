import { profileController } from '@/controllers';
import { authenticate } from '@/middlewares/auth.middleware';
import BaseRouter from './base.route';

class ProfileRouter extends BaseRouter {
  routes(): void {
    this.router.use(authenticate);

    this.router.get('/', profileController.getAll);
    this.router.get('/:id', profileController.getById);
    this.router.post('/', profileController.create);
    this.router.put('/:id', profileController.update);
    this.router.delete('/:id', profileController.delete);
  }
}

export default new ProfileRouter().router;
