import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
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
  tableName: Position.VAR_TABLE_NAME
})
class Position extends Model {
  public static readonly VAR_TABLE_NAME = 'positions';
  public static readonly VAR_ID = 'id';
  public static readonly VAR_CODE = 'code';
  public static readonly VAR_NAME = 'name';
  public static readonly VAR_DESCRIPTION = 'description';
  public static readonly VAR_DEPARTMENT_ID = 'departmentId';
  public static readonly VAR_CREATED_AT = 'createdAt';
  public static readonly VAR_UPDATED_AT = 'updatedAt';

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Position.VAR_ID
  })
  id!: number;

  @Column({
    type: DataType.STRING(10),
    field: Position.VAR_CODE,
    unique: true,
    allowNull: false
  })
  code!: string;

  @Column({
    type: DataType.STRING(50),
    field: Position.VAR_NAME,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.TEXT,
    field: Position.VAR_DESCRIPTION,
    allowNull: true
  })
  description!: string;

  @ForeignKey(() => Department)
  @Column({
    type: DataType.INTEGER,
    field: Position.VAR_DEPARTMENT_ID,
    allowNull: false,
    onDelete: 'CASCADE'
  })
  departmentId!: number;

  @BelongsTo(() => Department)
  department!: Department;

  @Column({
    type: DataType.DATE,
    field: Position.VAR_CREATED_AT,
    allowNull: true,
    defaultValue: DataType.NOW
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    field: Position.VAR_UPDATED_AT,
    allowNull: true,
    defaultValue: DataType.NOW
  })
  updatedAt!: Date;
}

export default Position;
