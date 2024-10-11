import { GoalsType, MatchType } from '../types/MatchesModelType';
import { IMatches } from './IMatches';
import { IMatchesWithTeams } from './IMatchesWithTeams';

export interface IMatchesModel {
  findAll(): Promise<IMatchesWithTeams[]>;
  findFilteredMatches(inProgress: boolean): Promise<IMatchesWithTeams[]>;
  changeMatchToFinished(id: number): Promise<boolean>;
  changeTeamGoals(id: number, body: GoalsType): Promise<boolean>;
  postTeamGoals(body: MatchType): Promise<IMatches>;
}
