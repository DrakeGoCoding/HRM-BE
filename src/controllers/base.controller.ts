import { NextFunction, Request, Response } from 'express';

export interface IBaseController {
  getAll(req: Request, res: Response, next: NextFunction): Promise<void>;
  getById(req: Request, res: Response, next: NextFunction): Promise<void>;
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
  update(req: Request, res: Response, next: NextFunction): Promise<void>;
  delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export abstract class BaseController implements IBaseController {
  abstract getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  abstract getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  abstract create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  abstract update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  abstract delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
}
