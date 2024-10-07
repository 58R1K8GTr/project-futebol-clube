import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) { }

  public async getAllTeams(_req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.teamsService.getAllTeams();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
