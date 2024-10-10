import { IMatchesWithTeams } from './IMatchesWithTeams';

export interface IMatchesModel {
  findAll(): Promise<IMatchesWithTeams[]>;
}
