import AppError from '@/utils/error';
import { BelongsTo, Column, DataType, Model, Table } from 'sequelize-typescript';
import { BASE_ATTRIBUTES, BaseAttributes } from '.';
import User, { DEFAULT_PASSWORD, UserRole } from './user';

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
  tableName: 'profiles',
  hooks: {
    beforeCreate: async (profile: Profile) => {
      if (!profile.code) {
        throw new AppError({
          code: 400,
          message: 'Profile code is required'
        });
      }
      const newUser = await User.create({
        username: profile.code,
        password: DEFAULT_PASSWORD,
        role: UserRole.STAFF
      });
      profile.userId = newUser.id;
    }
  }
})
class Profile extends Model implements ProfileAttributes {
  @Column({
    type: DataType.INTEGER,
    field: 'id',
    primaryKey: true,
    autoIncrement: true
  })
  id!: number;

  @Column({
    type: DataType.STRING(10),
    field: 'code',
    unique: true
  })
  code!: string;

  @Column({
    type: DataType.STRING(50),
    field: 'firstName'
  })
  firstName!: string;

  @Column({
    type: DataType.STRING(50),
    field: 'lastName'
  })
  lastName!: string;

  @Column({
    type: DataType.VIRTUAL,
    field: 'fullName',
    get(this: Profile) {
      return [this.firstName, this.lastName].filter(Boolean).join(' ');
    }
  })
  fullName!: string;

  @Column({
    type: DataType.ENUM(...GENDER),
    field: 'gender',
  })
  gender!: Gender;

  @Column({
    type: DataType.STRING(50),
    field: 'email',
    unique: true
  })
  email!: string;

  @Column({
    type: DataType.STRING(10),
    field: 'phoneNumber',
    unique: true
  })
  phoneNumber!: string;

  @Column({
    type: DataType.DATEONLY,
    field: 'dateOfBirth'
  })
  dateOfBirth!: Date;

  @Column({
    type: DataType.INTEGER,
    field: 'userId',
    defaultValue: 0,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    references: {
      model: 'users',
      key: 'id'
    }
  })
  userId!: number;

  @BelongsTo(() => User, 'userId')
  user?: User;

  @Column({
    type: DataType.TEXT,
    field: 'avatar',
    defaultValue: DEFAULT_AVATAR
  })
  avatar!: string;

  @Column({
    type: DataType.ENUM(...PROFILE_STATUS),
    field: 'status',
    defaultValue: ProfileStatus.WORK
  })
  status!: ProfileStatus;

  @Column({
    type: DataType.TEXT,
    field: 'biography'
  })
  biography!: string;

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

export default Profile;
