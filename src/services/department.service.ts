import Department, {
  DepartmentAttributes,
  OMIT_DEPARTMENT_ATTRIBUTES
} from '@/models/department';
import { BaseService } from './base.service';

class DepartmentService extends BaseService<Department, DepartmentAttributes> {
  constructor() {
    super(Department, OMIT_DEPARTMENT_ATTRIBUTES);
  }
}

export default new DepartmentService();
