import { Algorithm } from 'jsonwebtoken';

const jwtConfig: { expiresIn: string; algorithm: Algorithm } = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

export default jwtConfig;
