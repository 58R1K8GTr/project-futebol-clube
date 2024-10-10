import { ServiceResponseType } from '../types/ServiceResponseTypes';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import Matches from '../models/Matches';
import { IMatchesWithTeams } from '../Interfaces/IMatchesWithTeams';

export default class MatchesService {
  constructor(
    private matchesService: IMatchesModel = new Matches(),
  ) { }

  public async getAllMatches(): ServiceResponseType<IMatchesWithTeams[]> {
    const matches = await this.matchesService.findAll();
    return { status: 'SUCCESSFUL', data: matches };
  }
}
