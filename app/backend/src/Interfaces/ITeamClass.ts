import { ILeaderboard } from './ILeaderboard';

export interface ITeamClass {
  updateStats(goalsFavor: number, goalsOwn: number): void;
  getTeamData(): ILeaderboard;
  getName(): string;
}
