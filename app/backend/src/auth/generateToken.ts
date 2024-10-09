import * as jwt from 'jsonwebtoken';
import jwtConfig from '../utils/jwtConfig';
import { IUser } from '../Interfaces/IUser';

const secret = (
  process.env.JWT_SECRET || 'uma senha da pesada, porradaria grande'
);

function generateToken({ id, email, role }: Pick<IUser, 'id' | 'role' | 'email'>) {
  const token = jwt.sign({ data: { id, email, role } }, secret, jwtConfig);
  return token;
}

export default generateToken;
