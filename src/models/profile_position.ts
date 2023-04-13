import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table
} from 'sequelize-typescript';
import { BASE_ATTRIBUTES, BaseAttributes } from '.';
import Position, { PositionAttributes } from './position';
import Profile, { ProfileAttributes } from './profile';

export interface ProfilePositionAttributes extends BaseAttributes {
  profileId: number;
  profile?: ProfileAttributes;
  positionId: number;
  position?: PositionAttributes;
}

export const OMIT_PROFILE_POSITION_ATTRIBUTES = [
  ...BASE_ATTRIBUTES,
  'profile',
  'position'
] as Array<keyof ProfilePositionAttributes>;

@Table({
  tableName: 'profile_positions'
})
class ProfilePosition extends Model implements ProfilePositionAttributes {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'id'
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    field: 'profileId',
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    references: {
      model: 'profiles',
      key: 'id'
    }
  })
  profileId!: number;

  @BelongsTo(() => Profile, 'profileId')
  profile!: Profile;

  @Column({
    type: DataType.INTEGER,
    field: 'positionId',
    allowNull: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    references: {
      model: 'positions',
      key: 'id'
    }
  })
  positionId!: number;

  @BelongsTo(() => Position, 'positionId')
  position!: Position;

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

export default ProfilePosition;
