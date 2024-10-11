import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) { }

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    let result;
    if (inProgress !== undefined) {
      result = await this.matchesService.getFilteredMatches(inProgress === 'true');
    } else {
      result = await this.matchesService.getAllMatches();
    }
    const { status, data } = result;
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async changeMatchToFinished(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const { status, data } = await this.matchesService.changeMatchToFinished(id);
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
