import AppError from '@/utils/error';
import { NextFunction, Request, Response } from 'express';

export const handleError = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message = 'Internal Server Error', code = 500, stack } = error;
  const data = Object.assign(
    {},
    { message },
    process.env.NODE_ENV === 'production' ? {} : { stack }
  );

  return res.status(code).json(data);
};
