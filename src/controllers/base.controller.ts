import { BaseAttributes } from '@/models';
import { BaseService } from '@/services/base.service';
import AppError from '@/utils/error';
import { NextFunction, Request, Response } from 'express';
import { Model } from 'sequelize-typescript';

export interface IBaseController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  getById(req: Request, res: Response, next: NextFunction): Promise<void>;
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
  update(req: Request, res: Response, next: NextFunction): Promise<void>;
  delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export abstract class BaseController<T extends Model, A extends BaseAttributes>
  implements IBaseController
{
  service: BaseService<T, A>;

  constructor(service: BaseService<T, A>) {
    this.service = service;
  }

  getAll = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { code, data } = await this.service.getAll(req.body);
      res.status(code).json({ data });
    } catch (error) {
      next(error);
    }
  };

  getById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (!id) {
        throw new AppError({
          code: 400,
          message: 'Undefined route'
        });
      }
      const { code, data } = await this.service.getById(id);
      res.status(code).json({ data });
    } catch (error) {
      next(error);
    }
  };

  create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { code, data } = await this.service.create(req.body);
      res.status(code).json(data);
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (!id) {
        throw new AppError({
          code: 400,
          message: 'Undefined route'
        });
      }
      const payload = req.body;
      const { code, data } = await this.service.update(id, payload);
      res.status(code).json({ data });
    } catch (error) {
      next(error);
    }
  };

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = Number(req.params.id);
      if (!id) {
        throw new AppError({
          code: 400,
          message: 'Undefined route'
        });
      }
      const { code, data } = await this.service.delete(id);
      res.status(code).json(data);
    } catch (error) {
      next(error);
    }
  };
}
