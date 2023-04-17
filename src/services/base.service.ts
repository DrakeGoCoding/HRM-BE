import { BaseAttributes } from '@/models';
import AppError from '@/utils/error';
import Helper from '@/utils/helper';
import { AppResponse } from '@/utils/types';
import { Op, Order, WhereOptions } from 'sequelize';
import { Model, ModelCtor } from 'sequelize-typescript';

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
    const invalidFilters = filters.filter((filter) => !isValidFilter(filter));
    if (invalidFilters.length > 0) {
      throw new AppError({
        code: 400,
        message: 'Invalid filter',
        data: invalidFilters
      });
    }

    const records = await this.model.findAll<T>({
      include: {
        all: true,
        nested: true
      },
      where: filters.reduce<WhereOptions<A>>((acc, cur) => {
        const { column, type, value, operator } = cur;

        const opr = getSequelizeOperator(operator);

        Object.assign(acc, {
          [column]: {
            [opr as any]: value
          }
        });

        return acc;
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

type DateTime = Date | string | number | null;
type DateTimeRange = [DateTime, DateTime];

type FilterItemType = 'boolean' | 'string' | 'number' | 'array' | 'datetime';

const BOOLEAN_OPERATORS = ['equal'] as const;
const STRING_OPERATORS = [
  'contain',
  'not_contain',
  'start_with',
  'end_with',
  'equal',
  'not_equal'
] as const;
const NUMBER_OPERATORS = [
  'equal',
  'not_equal',
  'greater_than',
  'greater_than_or_equal',
  'less_than',
  'less_than_or_equal'
] as const;
const ARRAY_OPERATORS = ['in', 'not_in'] as const;
const DATETIME_OPERATORS = [
  'between',
  'greater_than',
  'greater_than_or_equal',
  'less_than',
  'less_than_or_equal'
] as const;

type BooleanOperator = typeof BOOLEAN_OPERATORS[number];
type StringOperator = typeof STRING_OPERATORS[number];
type NumberOperator = typeof NUMBER_OPERATORS[number];
type ArrayOperator = typeof ARRAY_OPERATORS[number];
type DateTimeOperator = typeof DATETIME_OPERATORS[number];

type FilterItem<
  I,
  T extends FilterItemType = 'string',
  O = T extends 'boolean'
    ? BooleanOperator
    : T extends 'string'
    ? StringOperator
    : T extends 'number'
    ? NumberOperator
    : T extends 'array'
    ? ArrayOperator
    : T extends 'datetime'
    ? DateTimeOperator
    : never,
  V = T extends 'boolean'
    ? boolean
    : T extends 'string'
    ? string
    : T extends 'number'
    ? number
    : T extends 'array'
    ? Array<string | number>
    : T extends 'datetime'
    ? O extends 'between'
      ? DateTimeRange
      : DateTime
    : never
> = {
  column: keyof I;
  type: T;
  operator: O;
  value: V;
};

type BooleanFilterItem<I> = FilterItem<I, 'boolean'>;
type StringFilterItem<I> = FilterItem<I, 'string'>;
type NumberFilterItem<I> = FilterItem<I, 'number'>;
type ArrayFilterItem<I> = FilterItem<I, 'array'>;
type DateTimeFilterItem<I> = FilterItem<I, 'datetime'>;

type Filter<I> =
  | BooleanFilterItem<I>
  | StringFilterItem<I>
  | NumberFilterItem<I>
  | ArrayFilterItem<I>
  | DateTimeFilterItem<I>;

function getSequelizeOperator(
  operator:
    | BooleanOperator
    | StringOperator
    | NumberOperator
    | ArrayOperator
    | DateTimeOperator
) {
  switch (operator) {
    case 'equal':
      return Op.eq;
    case 'not_equal':
      return Op.ne;
    case 'greater_than':
      return Op.gt;
    case 'greater_than_or_equal':
      return Op.gte;
    case 'less_than':
      return Op.lt;
    case 'less_than_or_equal':
      return Op.lte;
    case 'contain':
      return Op.like;
    case 'not_contain':
      return Op.notLike;
    case 'start_with':
      return Op.like;
    case 'end_with':
      return Op.like;
    case 'in':
      return Op.in;
    case 'not_in':
      return Op.notIn;
  }
}

function isValidFilter<A>(filter: Filter<A>) {
  const { operator, type, value } = filter;
  switch (type) {
    case 'boolean':
      return typeof value === 'string' && BOOLEAN_OPERATORS.includes(operator);

    case 'number':
      return typeof value === 'number' && NUMBER_OPERATORS.includes(operator);

    case 'string':
      return typeof value === 'string' && STRING_OPERATORS.includes(operator);

    case 'array':
      return (
        Array.isArray(value) &&
        value.every((v) => typeof v === 'string' || typeof v === 'number') &&
        ARRAY_OPERATORS.includes(operator)
      );

    case 'datetime':
      if (operator === 'between') {
        return (
          Array.isArray(value) &&
          value.length === 2 &&
          value.every(
            (v) =>
              v === null ||
              typeof v === 'string' ||
              typeof v === 'number' ||
              v instanceof Date
          )
        );
      }
      return (
        (value === null ||
          typeof value === 'string' ||
          typeof value === 'number' ||
          value instanceof Date) &&
        DATETIME_OPERATORS.includes(operator)
      );

    default:
      return true;
  }
}

interface FilterPayload<A> {
  filters?: Filter<A>[];
  sort?: Array<{ column: keyof A; order: 'asc' | 'desc' }>;
  page?: number;
  pageSize?: number;
}
