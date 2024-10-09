import * as jwt from 'jsonwebtoken';
import jwtConfig from '../utils/jwtConfig';

const secret = (
  process.env.JWT_SECRET || 'uma senha da pesada, porradaria grande'
);

function generateToken(id: number) {
  const token = jwt.sign({ data: { userId: id } }, secret, jwtConfig);
  return token;
}

export default generateToken;
