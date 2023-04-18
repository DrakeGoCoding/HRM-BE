import { positionController } from '@/controllers';
import { authenticate, restrictTo } from '@/middlewares/auth.middleware';
import { UserRole } from '@/models/user';
import BaseRouter from './base.route';

class PositionRoute extends BaseRouter {
  routes(): void {
    this.router.use(authenticate);

    this.router.get('/', positionController.getAll);
    this.router.get('/:id', positionController.getById);

    this.router.use(restrictTo(UserRole.MANAGER, UserRole.ADMIN));
    this.router.post('/', positionController.create);
    this.router.put('/:id', positionController.update);
    this.router.delete('/:id', positionController.delete);
  }
}

export default new PositionRoute().router;
