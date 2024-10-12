import { ITeamClass } from './ITeamClass';

export interface ITeamStatsManagerClass {
  _teamsStats: { [key: string]: ITeamClass };

  initializeTeamStats(teamName: string): ITeamClass;
  updateTeamStats(teamName: string, goalsFavor: number, goalsAgainst: number): void;
  getTeam(teamName: string): ITeamClass | null;
}
