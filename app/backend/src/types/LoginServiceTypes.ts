import { IUser } from '../Interfaces/IUser';

export type LoginType = Pick<IUser, 'email' | 'password'>;
