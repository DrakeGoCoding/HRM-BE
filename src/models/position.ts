import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table
} from 'sequelize-typescript';
import { BASE_ATTRIBUTES, BaseAttributes } from '.';
import Department, { DepartmentAttributes } from './department';

export interface PositionAttributes extends BaseAttributes {
  id: number;
  code: string;
  name: string;
  description: string;
  departmentId: number;
  department?: DepartmentAttributes;
}

export const OMIT_POSITION_ATTRIBUTES = [
  ...BASE_ATTRIBUTES,
  'department'
] as Array<keyof PositionAttributes>;

@Table({
  tableName: 'positions'
})
class Position extends Model {
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
    type: DataType.TEXT,
    field: 'description'
  })
  description!: string;

  @Column({
    type: DataType.INTEGER,
    field: 'departmentId',
    defaultValue: 0,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'departments',
      key: 'id'
    }
  })
  departmentId!: number;

  @BelongsTo(() => Department, 'departmentId')
  department?: Department;

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

export default Position;
