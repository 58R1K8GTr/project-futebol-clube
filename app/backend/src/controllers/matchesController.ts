import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.matchesService.getAllMatches();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
