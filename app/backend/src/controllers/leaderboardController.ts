import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) { }

  public async getLeaderboardHome(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderboardService.getLeaderboardHome();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
