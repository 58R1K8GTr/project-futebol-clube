import IUserModel from '../Interfaces/IUserModel';
import { IUser } from '../Interfaces/IUser';
import UsersSequelize from '../database/models/UsersSequelize';

export default class UserModel implements IUserModel {
  private model = UsersSequelize;

  public async findByEmail(email: string): Promise<IUser | null> {
    const data = await this.model.findOne({ where: { email }, raw: true });
    return data;
  }
}
