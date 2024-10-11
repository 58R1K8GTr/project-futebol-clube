import { GoalsType } from '../types/MatchesModelType';
import { IMatchesWithTeams } from './IMatchesWithTeams';

export interface IMatchesModel {
  findAll(): Promise<IMatchesWithTeams[]>;
  findFilteredMatches(inProgress: boolean): Promise<IMatchesWithTeams[]>;
  changeMatchToFinished(id: number): Promise<boolean>;
  changeTeamGoals(id: number, body: GoalsType): Promise<boolean>;
}
