export interface BaseAttributes {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export const BASE_ATTRIBUTES = ['id', 'createdAt', 'updatedAt', 'deletedAt'];
