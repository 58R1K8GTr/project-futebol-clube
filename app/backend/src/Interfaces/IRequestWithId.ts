import { Request } from 'express';
import { IUser } from './IUser';

export interface IRequestWithId extends Request {
  user: Pick<IUser, 'id' | 'email' | 'role'>;
}
