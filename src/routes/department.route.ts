import { departmentController } from '@/controllers';
import { authenticate, restrictTo } from '@/middlewares/auth.middleware';
import { UserRole } from '@/models/user';
import BaseRouter from './base.route';

class DepartmentRoute extends BaseRouter {
  routes(): void {
    this.router.use(authenticate);

    this.router.get('/', departmentController.getAll);
    this.router.get('/:id', departmentController.getById);

    this.router.use(restrictTo(UserRole.MANAGER, UserRole.ADMIN));
    this.router.put('/:id', departmentController.update);

    this.router.use(restrictTo(UserRole.ADMIN));
    this.router.post('/', departmentController.create);
    this.router.delete('/:id', departmentController.delete);
  }
}

export default new DepartmentRoute().router;
