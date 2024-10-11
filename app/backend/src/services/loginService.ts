import * as bcrypt from 'bcryptjs';
import { ServiceResponseType } from '../types/ServiceResponseTypes';
import IUserModel from '../Interfaces/IUserModel';
import { LoginType } from '../types/LoginServiceTypes';
import fieldsExist from './validations/fieldsExist';
import UsersModel from '../models/UserModel';
import generateToken from '../auth/generateToken';
import validEmail from './validations/validEmail';
import validPassword from './validations/validPassword';

type TokenType = {
  token: string;
};

export default class LoginService {
  constructor(
    private loginModel: IUserModel = new UsersModel(),
  ) { }

  public async login(loginFields: LoginType): ServiceResponseType<TokenType> {
    const { email, password } = loginFields;
    if (!fieldsExist([email, password])) {
      return { status: 'BAD_REQUEST', data: { message: 'All fields must be filled' } };
    }
    const user = await this.loginModel.findByEmail(email);

    const condition = [
      validEmail(email),
      validPassword(password),
    ];
    if (!user || !bcrypt.compareSync(password, user.password) || !condition.every(Boolean)) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }
    const token = generateToken(user);
    return { status: 'SUCCESSFUL', data: { token } };
  }
}
