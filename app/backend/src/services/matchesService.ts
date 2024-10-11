import { ServiceResponseType } from '../types/ServiceResponseTypes';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import MatchesModel from '../models/MatchesModel';
import { IMatchesWithTeams } from '../Interfaces/IMatchesWithTeams';

type MessageType = {
  message: string;
};

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) { }

  public async getAllMatches(): ServiceResponseType<IMatchesWithTeams[]> {
    const matches = await this.matchesModel.findAll();
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async getFilteredMatches(inProgress: boolean): ServiceResponseType<IMatchesWithTeams[]> {
    const matches = await this.matchesModel.findFilteredMatches(inProgress);
    return { status: 'SUCCESSFUL', data: matches };
  }

  public async changeMatchToFinished(id: number): ServiceResponseType<MessageType> {
    const changed = await this.matchesModel.changeMatchToFinished(id);
    if (!changed) return { status: 'BAD_REQUEST', data: { message: 'Not changed' } };
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }
}
