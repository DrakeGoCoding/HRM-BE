import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table
} from 'sequelize-typescript';
import { BASE_ATTRIBUTES, BaseAttributes } from '.';
import Profile from './profile';

export interface DepartmentAttributes extends BaseAttributes {
  code: string;
  name: string;
  establishedDate: Date;
  managerId: number;
  manager?: Profile;
}

export const OMIT_DEPARTMENT_ATTRIBUTES = [
  ...BASE_ATTRIBUTES,
  'manager'
] as Array<keyof DepartmentAttributes>;

@Table({
  tableName: 'departments'
})
class Department extends Model implements DepartmentAttributes {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  })
  id!: number;

  @Column({
    type: DataType.STRING(10),
    field: 'code',
    unique: {
      name: 'code',
      msg: 'Code must be unique'
    }
  })
  code!: string;

  @Column({
    type: DataType.STRING(50),
    field: 'name'
  })
  name!: string;

  @Column({
    type: DataType.DATEONLY,
    field: 'establishedDate',
    defaultValue: DataType.NOW
  })
  establishedDate!: Date;

  @Column({
    type: DataType.INTEGER,
    field: 'managerId',
    defaultValue: 0,
    onDelete: 'SET DEFAULT',
    onUpdate: 'CASCADE',
    references: {
      model: 'profiles',
      key: 'id'
    }
  })
  managerId!: number;

  @BelongsTo(() => Profile, 'managerId')
  manager?: Profile;

  @Column({
    type: DataType.DATE,
    field: 'createdAt',
    allowNull: true,
    defaultValue: DataType.NOW
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    field: 'updatedAt',
    allowNull: true,
    defaultValue: DataType.NOW
  })
  updatedAt!: Date;
}

export default Department;
