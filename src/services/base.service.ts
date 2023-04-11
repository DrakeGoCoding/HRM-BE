import AppError from '@/utils/error';
import { AppResponse } from '@/utils/types';
import { Model, ModelCtor } from 'sequelize-typescript';

export interface IBaseService<T extends Model, A> {
  create(payload: A): Promise<AppResponse<T>>;
  update(id: number, payload: Partial<A>): Promise<AppResponse<T>>;
  delete(id: number): Promise<AppResponse<number>>;
  getById(id: number): Promise<AppResponse<T | null>>;
  getAll(): Promise<AppResponse<T[]>>;
}

export abstract class BaseService<T extends Model, A extends {}>
  implements IBaseService<T, A>
{
  abstract getModel(): ModelCtor<T>;
  abstract create(payload: A): Promise<AppResponse<T>>;

  async update(id: number, payload: Partial<A>): Promise<AppResponse<T>> {
    const modelName: string = this.getModel().tableName;
    const { data } = await this.getById(id);
    if (!data) {
      throw new AppError({
        code: 400,
        message: `${modelName} not found`
      });
    }

    Object.assign(data, payload);
    const updatedNote = await data.save();

    return {
      data: updatedNote,
      code: 200
    };
  }

  async delete(id: number): Promise<AppResponse<number>> {
    const modelName: string = this.getModel().tableName;
    const record = await this.getById(id);
    if (!record.data) {
      throw new AppError({
        code: 400,
        message: `${modelName} not found`
      });
    }
    await record.data.destroy();

    return {
      data: id,
      code: 200
    };
  }

  async getById(id: number): Promise<AppResponse<T | null>> {
    const record = await this.getModel().findOne<T>({
      where: { id } as any
    });
    return {
      data: record,
      code: 200
    };
  }

  async getAll(): Promise<AppResponse<T[]>> {
    const records = await this.getModel().findAll<T>();
    return {
      data: records,
      code: 200
    };
  }
}
