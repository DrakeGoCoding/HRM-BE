import { positionController } from '@/controllers';
import { authenticate } from '@/middlewares/auth.middleware';
import BaseRouter from './base.route';

class PositionRoute extends BaseRouter {
  routes(): void {
    this.router.use(authenticate);

    this.router.get('/', positionController.getAll);
    this.router.get('/:id', positionController.getById);
    this.router.post('/', positionController.create);
    this.router.put('/:id', positionController.update);
    this.router.delete('/:id', positionController.delete);
  }
}

export default new PositionRoute().router;
