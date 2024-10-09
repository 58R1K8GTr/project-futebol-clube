import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LoginService from '../services/loginService';

export default class LoginController {
  constructor(
    private loginService = new LoginService(),
  ) { }

  public async login(req: Request, res: Response): Promise<Response> {
    const { body } = req;
    const { status, data } = await this.loginService.login(body);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
