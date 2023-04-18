import { Op } from 'sequelize';
import {
  ARRAY_OPERATORS,
  ArrayOperator,
  BOOLEAN_OPERATORS,
  BooleanOperator,
  DATETIME_OPERATORS,
  DateTimeOperator,
  Filter,
  NUMBER_OPERATORS,
  NumberOperator,
  STRING_OPERATORS,
  StringOperator
} from './types';

class Helper {
  public static pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    const result = {} as Pick<T, K>;
    keys.forEach((key) => {
      result[key] = obj[key];
    });
    return result;
  }

  public static omit<T extends {}, K extends keyof T>(
    obj: T,
    keys: K[]
  ): Omit<T, K> {
    const result = { ...obj };
    keys.forEach((key) => {
      if (key in result) {
        delete result[key];
      }
    });
    return result;
  }

  public static getSequelizeOperator(
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
        return Op.startsWith;
      case 'end_with':
        return Op.endsWith;
      case 'in':
        return Op.in;
      case 'not_in':
        return Op.notIn;
    }
  }

  public static isValidFilter<T>(filter: Filter<T>) {
    const { column, operator, type, value } = filter;

    if (!column || !operator || !type) {
      return false;
    }

    switch (type) {
      case 'boolean':
        return (
          typeof value === 'string' && BOOLEAN_OPERATORS.includes(operator)
        );

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
}

export default Helper;
