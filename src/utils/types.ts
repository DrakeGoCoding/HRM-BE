export type ValueOf<T> = T[keyof T];
export type AtLeast<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;
export type WithRequiredProperty<T, K extends keyof T> = T & {
  [P in K]-?: T[P];
};
export type Modify<T, R> = Omit<T, keyof R> & R;

export type DateTime = Date | string | number | null;
export type DateTimeRange = [DateTime, DateTime];

export interface AppResponse<T = unknown> {
  data: T;
  code: number;
}

export interface Paging<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export const BOOLEAN_OPERATORS = ['equal'] as const;
export const STRING_OPERATORS = [
  'contain',
  'not_contain',
  'start_with',
  'end_with',
  'equal',
  'not_equal'
] as const;
export const NUMBER_OPERATORS = [
  'equal',
  'not_equal',
  'greater_than',
  'greater_than_or_equal',
  'less_than',
  'less_than_or_equal'
] as const;
export const ARRAY_OPERATORS = ['in', 'not_in'] as const;
export const DATETIME_OPERATORS = [
  'between',
  'greater_than',
  'greater_than_or_equal',
  'less_than',
  'less_than_or_equal'
] as const;

export type BooleanOperator = typeof BOOLEAN_OPERATORS[number];
export type StringOperator = typeof STRING_OPERATORS[number];
export type NumberOperator = typeof NUMBER_OPERATORS[number];
export type ArrayOperator = typeof ARRAY_OPERATORS[number];
export type DateTimeOperator = typeof DATETIME_OPERATORS[number];

type FilterItemType = 'boolean' | 'string' | 'number' | 'array' | 'datetime';
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

export type Filter<I = unknown> =
  | BooleanFilterItem<I>
  | StringFilterItem<I>
  | NumberFilterItem<I>
  | ArrayFilterItem<I>
  | DateTimeFilterItem<I>;

export type FilterPayload<A> = {
  columns?: (keyof A)[];
  filters?: Filter<A>[];
  sort?: Array<{ column: keyof A; order: 'asc' | 'desc' }>;
  page?: number;
  pageSize?: number;
};
