import { UserRole } from '@/models/user';
import Authentication from '@/utils/auth';
import { NextFunction, Request, Response } from 'express';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string | undefined = req.cookies.token;

  if (!token) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const credential = Authentication.validateToken(token);
    if (!credential) {
      return res.status(401).send('Invalid token');
    }
    req.app.locals.credential = credential;
    next();
  } catch (error) {
    res.status(401).send('Unauthorized');
  }
};

export const restrictTo = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const credential = req.app.locals.credential;
    if (!credential) {
      return res.status(401).send('Unauthorized');
    }
    if (!roles.includes(credential.role)) {
      return res.status(403).send('Forbidden');
    }
    next();
  };
};
