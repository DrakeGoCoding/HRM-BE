import { Column, DataType, Model, Table } from 'sequelize-typescript';

export const USER_ROLE = ['staff', 'manager', 'admin'] as const;
export type UserRole = typeof USER_ROLE[number];

export const DEFAULT_PASSWORD = '1Abcde@hrm';

@Table({
  tableName: User.VAR_TABLE_NAME
})
class User extends Model {
  public static readonly VAR_TABLE_NAME = 'users';
  public static readonly VAR_ID = 'id';
  public static readonly VAR_USERNAME = 'username';
  public static readonly VAR_PASSWORD = 'password';
  public static readonly VAR_ROLE = 'role';

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: User.VAR_ID
  })
  id!: number;

  @Column({
    type: DataType.STRING(50),
    field: User.VAR_USERNAME,
    allowNull: false
  })
  username!: string;

  @Column({
    type: DataType.TEXT,
    field: User.VAR_PASSWORD,
    allowNull: false,
    defaultValue: DEFAULT_PASSWORD
  })
  password!: string;

  @Column({
    type: DataType.ENUM(...USER_ROLE),
    field: User.VAR_ROLE,
    allowNull: false,
    defaultValue: USER_ROLE[0]
  })
  role!: UserRole;
}

export default User;
