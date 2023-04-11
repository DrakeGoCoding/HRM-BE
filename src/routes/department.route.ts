import { departmentController } from '@/controllers';
import { authenticate } from '@/middlewares/auth.middleware';
import BaseRouter from './base.route';

class DepartmentRoute extends BaseRouter {
  routes(): void {
    this.router.use(authenticate);

    this.router.get('/', departmentController.getAll);
    this.router.get('/:id', departmentController.getById);
    this.router.post('/', departmentController.create);
    this.router.put('/:id', departmentController.update);
    this.router.delete('/:id', departmentController.delete);
  }
}

export default new DepartmentRoute().router;
