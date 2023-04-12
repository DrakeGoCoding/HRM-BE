import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { BASE_ATTRIBUTES, BaseAttributes } from '.';
import { DepartmentAttributes } from './department';
import { PositionAttributes } from './position';
import User from './user';

export enum Gender {
  MALE = 'M',
  FEMALE = 'F'
}
const GENDER = Object.values(Gender);

export enum ProfileStatus {
  INTERN = 'intern',
  WORK = 'work',
  QUIT = 'quit'
}
const PROFILE_STATUS = Object.values(ProfileStatus);

const DEFAULT_AVATAR = '';

export interface ProfileAttributes extends BaseAttributes {
  code: string;
  firstName: string;
  lastName: string;
  fullName?: string;
  gender: Gender;
  email: string;
  phoneNumber: string;
  dateOfBirth: Date;
  avatar: string;
  status: ProfileStatus;
  biography: string;
  departmentId: number;
  department?: DepartmentAttributes;
  positionId: number;
  position?: PositionAttributes;
  userId: number;
  user?: User;
}

export const OMIT_PROFILE_ATTRIBUTES = [
  ...BASE_ATTRIBUTES,
  'fullName',
  'department',
  'position',
  'user'
] as Array<keyof ProfileAttributes>;

@Table({
  tableName: Profile.VAR_TABLE_NAME,
  hooks: {
    beforeCreate: (profile: Profile) => {
      //
    }
  }
})
class Profile extends Model implements ProfileAttributes {
  public static readonly VAR_TABLE_NAME = 'profiles';
  public static readonly VAR_ID = 'id';
  public static readonly VAR_CODE = 'code';
  public static readonly VAR_FIRST_NAME = 'firstName';
  public static readonly VAR_LAST_NAME = 'lastName';
  public static readonly VAR_FULL_NAME = 'fullName';
  public static readonly VAR_GENDER = 'gender';
  public static readonly VAR_EMAIL = 'email';
  public static readonly VAR_PHONE_NUMBER = 'phoneNumber';
  public static readonly VAR_DOB = 'dateOfBirth';
  public static readonly VAR_DEPARTMENT_ID = 'departmentId';
  public static readonly VAR_POSITION_ID = 'positionId';
  public static readonly VAR_USER_ID = 'userId';
  public static readonly VAR_AVATAR = 'avatar';
  public static readonly VAR_STATUS = 'status';
  public static readonly VAR_BIOGRAPHY = 'biography';
  public static readonly VAR_CREATED_AT = 'createdAt';
  public static readonly VAR_UPDATED_AT = 'updatedAt';

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: Profile.VAR_ID
  })
  id!: number;

  @Column({
    type: DataType.STRING(10),
    field: Profile.VAR_CODE,
    unique: true,
    allowNull: false
  })
  code!: string;

  @Column({
    type: DataType.STRING(50),
    field: Profile.VAR_FIRST_NAME,
    allowNull: false
  })
  firstName!: string;

  @Column({
    type: DataType.STRING(50),
    field: Profile.VAR_LAST_NAME
  })
  lastName!: string;

  @Column({
    type: DataType.VIRTUAL,
    field: Profile.VAR_FULL_NAME,
    get(this: Profile) {
      return [this.firstName, this.lastName].filter(Boolean).join(' ');
    }
  })
  @Column({
    type: DataType.ENUM(...GENDER),
    field: Profile.VAR_GENDER,
    allowNull: false
  })
  gender!: Gender;

  @Column({
    type: DataType.STRING(50),
    field: Profile.VAR_EMAIL,
    allowNull: false,
    unique: true
  })
  email!: string;

  @Column({
    type: DataType.STRING(10),
    field: Profile.VAR_PHONE_NUMBER,
    allowNull: false,
    unique: true
  })
  phoneNumber!: string;

  @Column({
    type: DataType.DATEONLY,
    field: Profile.VAR_DOB
  })
  dateOfBirth!: Date;

  @Column({
    type: DataType.INTEGER,
    field: Profile.VAR_DEPARTMENT_ID,
    allowNull: false,
    defaultValue: 0,
    onUpdate: 'CASCADE',
    onDelete: 'SET DEFAULT'
  })
  departmentId!: number;

  @Column({
    type: DataType.INTEGER,
    field: Profile.VAR_POSITION_ID,
    allowNull: false,
    defaultValue: 0,
    onUpdate: 'CASCADE',
    onDelete: 'SET DEFAULT'
  })
  positionId!: number;

  @Column({
    type: DataType.INTEGER,
    field: Profile.VAR_USER_ID,
    allowNull: false,
    defaultValue: 0,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  userId!: number;

  @Column({
    type: DataType.TEXT,
    field: Profile.VAR_AVATAR,
    defaultValue: DEFAULT_AVATAR
  })
  avatar!: string;

  @Column({
    type: DataType.ENUM(...PROFILE_STATUS),
    field: Profile.VAR_STATUS,
    allowNull: false,
    defaultValue: ProfileStatus.WORK
  })
  status!: ProfileStatus;

  @Column({
    type: DataType.TEXT,
    field: Profile.VAR_BIOGRAPHY
  })
  biography!: string;

  @Column({
    type: DataType.DATE,
    field: Profile.VAR_CREATED_AT,
    allowNull: true,
    defaultValue: DataType.NOW
  })
  createdAt!: Date;

  @Column({
    type: DataType.DATE,
    field: Profile.VAR_UPDATED_AT,
    allowNull: true,
    defaultValue: DataType.NOW
  })
  updatedAt!: Date;
}

export default Profile;
