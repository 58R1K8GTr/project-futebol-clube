import { Response } from 'express';
import { IRequestWithId } from '../Interfaces/IRequestWithId';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LoginRoleController {
  static async getRole(req: IRequestWithId, res: Response): Promise<Response> {
    const { role } = req.user;
    return res.status(mapStatusHTTP('SUCCESSFUL')).json({ role });
  }
}
