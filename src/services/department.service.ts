import Department, {
  DepartmentAttributes,
  OMIT_DEPARTMENT_ATTRIBUTES
} from '@/models/department';
import Helper from '@/utils/helper';
import { AppResponse } from '@/utils/types';
import { BaseService } from './base.service';

class DepartmentService extends BaseService<Department, DepartmentAttributes> {
  getModel() {
    return Department;
  }

  async create(
    payload: DepartmentAttributes
  ): Promise<AppResponse<Department>> {
    const newDepartment = await Department.create(
      Helper.omit(payload, OMIT_DEPARTMENT_ATTRIBUTES)
    );
    return {
      data: newDepartment,
      code: 201
    };
  }
}

export default new DepartmentService();
