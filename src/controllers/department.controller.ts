import Department, { DepartmentAttributes } from '@/models/department';
import { departmentService } from '@/services';
import { BaseController } from './base.controller';

class DepartmentController extends BaseController<
  Department,
  DepartmentAttributes
> {
  constructor() {
    super(departmentService);
  }
}

export default new DepartmentController();
