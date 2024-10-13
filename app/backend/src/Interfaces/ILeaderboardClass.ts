import MatchClass from '../classes/matchClass';
import TeamClass from '../classes/teamClass';
import { ILeaderboard } from './ILeaderboard';

export interface ILeaderboardClass {
  addTeam(team: TeamClass): void;
  addMatch(match: MatchClass): void;
  getLeaderboardHome(): ILeaderboard[];
  getLeaderboardAway(): ILeaderboard[];
  getLeaderboardFull(): ILeaderboard[];
}
