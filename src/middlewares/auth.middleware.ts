import { UserRole } from '@/models/user';
import Authentication from '@/utils/auth';
import { NextFunction, Request, Response } from 'express';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken: string | undefined = req.cookies?.['access_token'];

  if (!accessToken) {
    console.warn('Unauthorized: No access token found.');
    console.warn(`Request: ${req.method} ${req.originalUrl} from ${req.ip}`);
    return res.status(401).send('Unauthorized');
  }

  try {
    const credential = Authentication.validateToken(accessToken);
    if (!credential) {
      console.warn('Unauthorized: No credential found.');
      console.warn(`Request: ${req.method} ${req.originalUrl} from ${req.ip}`);
      return res.status(401).send('Invalid token');
    }
    req.app.locals.credential = credential;
    next();
  } catch (error) {
    res.status(500).send('Internal server error');
  }
};

export const restrictTo = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const credential = req.app.locals.credential;
    if (!credential) {
      console.warn('Unauthorized: No credential found.');
      console.warn(`Request: ${req.method} ${req.originalUrl} from ${req.ip}`);
      return res.status(401).send('Unauthorized');
    }
    if (!roles.includes(credential.role)) {
      console.warn(
        `Forbidden: User [id=${credential.userId},username=${credential.username},role=${credential.role}] is trying to access a restricted route for [${roles}].`
      );
      console.warn(`Request: ${req.method} ${req.originalUrl} from ${req.ip}`);
      return res.status(403).send('Forbidden');
    }
    next();
  };
};
