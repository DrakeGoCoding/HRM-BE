import { UserService } from '@/services/user.service';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

export const GENDER = ['M', 'F'] as const;
export type Gender = typeof GENDER[number];

export const PROFILE_STATUS = ['intern', 'work', 'quit'] as const;
export type ProfileStatus = typeof PROFILE_STATUS[number];

@Table({
  tableName: Profile.VAR_TABLE_NAME
})
class Profile extends Model {
  public static readonly VAR_TABLE_NAME = 'profiles';
  public static readonly VAR_ID = 'id';
  public static readonly VAR_CODE = 'code';
  public static readonly VAR_FIRST_NAME = 'firstName';
  public static readonly VAR_LAST_NAME = 'lastName';
  public static readonly VAR_GENDER = 'gender';
  public static readonly VAR_EMAIL = 'email';
  public static readonly VAR_PHONE_NUMBER = 'phoneNumber';
  public static readonly VAR_DOB = 'dateOfBirth';
  public static readonly VAR_DEPARTMENT_ID = 'departmentId';
  public static readonly VAR_POSITION_ID = 'positionId';
  public static readonly VAR_AVATAR = 'avatar';
  public static readonly VAR_STATUS = 'status';
  public static readonly VAR_BIOGRAPHY = 'biography';

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
    type: DataType.ENUM(...GENDER),
    field: Profile.VAR_GENDER,
    allowNull: false,
    defaultValue: GENDER[0],
    validate: {}
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
    type: DataType.DATE,
    field: Profile.VAR_DOB
  })
  dateOfBirth!: Date;

  @Column({
    type: DataType.INTEGER,
    field: Profile.VAR_DEPARTMENT_ID,
    allowNull: false,
    defaultValue: 0,
    onDelete: 'SET DEFAULT'
  })
  departmentId!: number;

  @Column({
    type: DataType.INTEGER,
    field: Profile.VAR_POSITION_ID,
    allowNull: false,
    defaultValue: 0,
    onDelete: 'SET DEFAULT'
  })
  positionId!: number;

  @Column({
    type: DataType.TEXT,
    field: Profile.VAR_AVATAR
  })
  avatar!: string;

  @Column({
    type: DataType.ENUM(...PROFILE_STATUS),
    field: Profile.VAR_STATUS,
    allowNull: false,
    defaultValue: PROFILE_STATUS[0]
  })
  status!: ProfileStatus;

  @Column({
    type: DataType.TEXT,
    field: Profile.VAR_BIOGRAPHY
  })
  biography!: string;
}

// Profile.beforeCreate((profile: Profile) => {});

export default Profile;
