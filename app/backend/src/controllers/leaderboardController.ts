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

  public async getLeaderboardAway(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderboardService.getLeaderboardAway();
    return res.status(mapStatusHTTP(status)).json(data);
  }

  public async getAllLeaderboard(req: Request, res: Response): Promise<Response> {
    const { status, data } = await this.leaderboardService.getAllLeaderboard();
    return res.status(mapStatusHTTP(status)).json(data);
  }
}
