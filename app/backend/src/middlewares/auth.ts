import { NextFunction, Response } from 'express';
import jwtUtil from '../auth/jwtToken';
import UserSequelize from '../database/models/UsersSequelize';
import { RequestWithUser } from '../Interfaces/IRequestWithUser';
import mapStatusHTTP from '../utils/mapStatusHTTP';

function extractToken(authorization: string) {
  return authorization.split(' ')[1];
}

async function authMiddleware(req: RequestWithUser, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Token is required' });
  }

  const token = extractToken(authorization);

  try {
    const decoded = await jwtUtil.verify(token);
    const user = await UserSequelize.findOne({ where: { email: decoded.email } });
    if (!user) return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Token invalid' });
    req.user = user;

    next();
  } catch (e) {
    return res.status(mapStatusHTTP('UNAUTHORIZED')).json({ message: 'Token invalid' });
  }
}

export default authMiddleware;
