import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { BASE_ATTRIBUTES, BaseAttributes } from '.';

export enum UserRole {
  STAFF = 'staff',
  MANAGER = 'manager',
  ADMIN = 'admin'
}

export const DEFAULT_PASSWORD = '1Abcde@hrm';

export interface UserAttributes extends BaseAttributes {
  username: string;
  password: string;
  role: UserRole;
}

export const OMIT_USER_ATTRIBUTES = [...BASE_ATTRIBUTES] as Array<
  keyof UserAttributes
>;

@Table({
  tableName: User.VAR_TABLE_NAME
})
class User extends Model implements UserAttributes {
  public static readonly VAR_TABLE_NAME = 'users';
  public static readonly VAR_ID = 'id';
  public static readonly VAR_USERNAME = 'username';
  public static readonly VAR_PASSWORD = 'password';
  public static readonly VAR_ROLE = 'role';
  public static readonly VAR_CREATED_AT = 'createdAt';
  public static readonly VAR_UPDATED_AT = 'updatedAt';

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
    type: DataType.ENUM(...Object.values(UserRole)),
    field: User.VAR_ROLE,
    allowNull: false,
    defaultValue: UserRole.STAFF
  })
  role!: UserRole;

  @Column({
    type: DataType.DATE,
    field: User.VAR_CREATED_AT,
    allowNull: true,
    defaultValue: DataType.NOW
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    field: User.VAR_UPDATED_AT,
    allowNull: true,
    defaultValue: DataType.NOW
  })
  updatedAt!: Date;
}

export default User;
