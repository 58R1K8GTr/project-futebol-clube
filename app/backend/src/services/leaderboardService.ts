import { ILeaderboard } from '../Interfaces/ILeaderboard';
import { ServiceResponseType } from '../types/ServiceResponseTypes';
import LeaderboardModel from '../models/LeaderboardModel';

export default class LeaderboardService {
  private leaderboardModel = LeaderboardModel;

  public async getLeaderboardHome(): ServiceResponseType<ILeaderboard[]> {
    const leaderboards = await this.leaderboardModel.getLeaderboardHome();
    return { status: 'SUCCESSFUL', data: leaderboards };
  }
}
