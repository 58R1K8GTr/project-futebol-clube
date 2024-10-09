import { NextFunction, Request, Response } from 'express';
import jwtUtil from '../auth/jwtToken';
import UserSequelize from '../database/models/UsersSequelize';
import { IRequestWithId } from '../Interfaces/IRequestWithId';
import mapStatusHTTP from '../utils/mapStatusHTTP';

function extractToken(authorization: string) {
  return authorization.split(' ')[1];
}

type TryCatchType = {
  token: string;
  req: Request;
  res: Response;
  next: NextFunction;
};

async function trycatch(params: TryCatchType): Promise<Response | void> {
  const { token, req, res, next } = params;
  try {
    const decoded = await jwtUtil.verify(token);
    const user = await UserSequelize.findOne({ where: { id: decoded.data.id } });
    if (!user) {
      return res.status(mapStatusHTTP('UNAUTHORIZED'))
        .json({ message: 'Token must be a valid token' });
    }
    const { id, email, role } = user;
    (req as IRequestWithId).user = { id, email, role };

    next();
  } catch (e) {
    // console.log(e); // log para desenvolvimento
    return res.status(mapStatusHTTP('UNAUTHORIZED'))
      .json({ message: 'Token must be a valid token' });
  }
}

async function authMiddleware(req: Request, res: Response, next: NextFunction):
Promise<Response | void> {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Token not found' });
  }

  const token = extractToken(authorization);

  return trycatch({ token, req, res, next });
}

export default authMiddleware;
