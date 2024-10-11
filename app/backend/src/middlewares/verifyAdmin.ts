import { NextFunction, Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { IRequestWithUser } from '../Interfaces/IRequestWithId';

async function verifyAdmin(req: Request, res: Response, next: NextFunction):
Promise<Response | void> {
  const isNotAdmin = (req as IRequestWithUser).user.role !== 'admin';
  if (isNotAdmin) {
    return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'UNAUTHORIZED' });
  }
  next();
}

export default verifyAdmin;
