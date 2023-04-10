import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table
} from 'sequelize-typescript';
import Profile from './profile';

@Table({
  tableName: Department.VAR_TABLE_NAME
})
class Department extends Model {
  public static readonly VAR_TABLE_NAME = 'departments';
  public static readonly VAR_ID = 'id';
  public static readonly VAR_CODE = 'code';
  public static readonly VAR_NAME = 'name';
  public static readonly VAR_ESTABLISHED_DATE = 'establishedDate';
  public static readonly VAR_MANAGER_ID = 'managerId';

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Department.VAR_ID
  })
  id!: number;

  @Column({
    type: DataType.STRING(10),
    field: Department.VAR_CODE,
    unique: true,
    allowNull: false
  })
  code!: string;

  @Column({
    type: DataType.STRING(50),
    field: Department.VAR_NAME,
    allowNull: false
  })
  name!: string;

  @Column({
    type: DataType.DATE,
    field: Department.VAR_ESTABLISHED_DATE
  })
  establishedDate!: Date;

  @ForeignKey(() => Profile)
  @Column({
    type: DataType.INTEGER,
    field: Department.VAR_MANAGER_ID,
    allowNull: false,
    defaultValue: 0,
    onDelete: 'SET DEFAULT'
  })
  managerId!: number;

  @BelongsTo(() => Profile)
  manager!: Profile;
}

Department.belongsTo(Profile, {
  foreignKey: Department.VAR_MANAGER_ID
});

export default Department;
