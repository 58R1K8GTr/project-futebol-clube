import { ILeaderboard } from '../Interfaces/ILeaderboard';
import { ServiceResponseType } from '../types/ServiceResponseTypes';
import LeaderboardModel from '../models/LeaderboardModel';

export default class LeaderboardService {
  private leaderboardModel = new LeaderboardModel();

  public async getLeaderboardHome(): ServiceResponseType<ILeaderboard[]> {
    const leaderboards = await this.leaderboardModel.getLeaderboardHome();
    return { status: 'SUCCESSFUL', data: leaderboards };
  }

  public async getLeaderboardAway(): ServiceResponseType<ILeaderboard[]> {
    const leaderboards = await this.leaderboardModel.getLeaderboardAway();
    return { status: 'SUCCESSFUL', data: leaderboards };
  }

  public async getAllLeaderboard(): ServiceResponseType<ILeaderboard[]> {
    const leaderboards = await this.leaderboardModel.getAllLeaderboard();
    return { status: 'SUCCESSFUL', data: leaderboards };
  }
}
