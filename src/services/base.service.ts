import { BaseAttributes } from '@/models';
import AppError from '@/utils/error';
import Helper from '@/utils/helper';
import { AppResponse } from '@/utils/types';
import { Order, WhereOptions } from 'sequelize';
import { Model, ModelCtor } from 'sequelize-typescript';

interface FilterPayload<A> {
  filters?: Array<{
    column: keyof A;
    type: string;
    value: any;
    operator: string;
  }>;
  sort?: Array<{ column: keyof A; order: 'asc' | 'desc' }>;
  page?: number;
  pageSize?: number;
}

export interface IBaseService<T extends Model, A extends BaseAttributes> {
  create(payload: A): Promise<AppResponse<T>>;
  update(id: number, payload: Partial<A>): Promise<AppResponse<T>>;
  delete(id: number): Promise<AppResponse<number>>;
  getById(id: number): Promise<AppResponse<T | null>>;
  getAll(payload?: FilterPayload<A>): Promise<AppResponse<T[]>>;
}

export abstract class BaseService<T extends Model, A extends BaseAttributes>
  implements IBaseService<T, A>
{
  model: ModelCtor<T>;
  omitAttributes: Array<keyof A>;

  constructor(model: ModelCtor<T>, omitAttributes: Array<keyof A>) {
    this.model = model;
    this.omitAttributes = omitAttributes;
  }

  create = async (payload: A): Promise<AppResponse<T>> => {
    const newRecord = await this.model.create(
      Helper.omit(payload, this.omitAttributes) as any
    );
    return {
      data: newRecord,
      code: 201
    };
  };

  update = async (id: number, payload: Partial<A>): Promise<AppResponse<T>> => {
    const modelName: string = this.model.tableName;
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
  };

  delete = async (id: number): Promise<AppResponse<number>> => {
    const modelName: string = this.model.tableName;
    const { data } = await this.getById(id);

    if (!data) {
      throw new AppError({
        code: 400,
        message: `${modelName} not found`
      });
    }

    await data.destroy();

    return {
      data: id,
      code: 200
    };
  };

  getById = async (id: number): Promise<AppResponse<T | null>> => {
    const record = await this.model.findOne<T>({
      where: { id } as any,
      include: {
        all: true
      }
    });

    return {
      data: record,
      code: 200
    };
  };

  getAll = async ({
    filters = [],
    sort = [{ column: 'updatedAt', order: 'asc' }],
    page = 1,
    pageSize = 20
  }: FilterPayload<A>): Promise<AppResponse<T[]>> => {
    const records = await this.model.findAll<T>({
      include: {
        all: true,
        nested: true
      },
      where: filters.reduce<WhereOptions<A>>((acc, cur) => {
        const { column, type, value, operator } = cur;
        return {
          ...acc
        };
      }, {}),
      order: sort.map((sort) => [
        sort.column,
        sort.order.toUpperCase()
      ]) as Order,
      limit: pageSize,
      offset: (page - 1) * pageSize
    });

    return {
      data: records,
      code: 200
    };
  };
}
