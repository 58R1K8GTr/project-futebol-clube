import TeamClass from '../classes/teamClass';
import { ILeaderboard } from './ILeaderboard';

export interface ILeaderboardClass {
  addTeam(team: TeamClass): void;
  getLeaderboard(): ILeaderboard[];
}
