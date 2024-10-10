import { IMatches } from './IMatches';

export interface ITeam {
  teamName: string;
}

export interface IMatchesWithTeams extends IMatches {
  homeTeam: ITeam;
  awayTeam: ITeam;
}
