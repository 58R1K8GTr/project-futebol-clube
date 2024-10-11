import { GoalsType, MatchType } from '../types/MatchesModelType';
import { ServiceResponseType } from '../types/ServiceResponseTypes';
import { IMatchesModel } from '../Interfaces/IMatchesModel';
import MatchesModel from '../models/MatchesModel';
import { IMatchesWithTeams } from '../Interfaces/IMatchesWithTeams';
import { IMatches } from '../Interfaces/IMatches';

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
    if (!changed) return { status: 'BAD_REQUEST', data: { message: 'Not updated' } };
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async changeTeamGoals(id: number, body: GoalsType): ServiceResponseType<MessageType> {
    const updated = await this.matchesModel.changeTeamGoals(id, body);
    if (!updated) return { status: 'BAD_REQUEST', data: { message: 'Not updated' } };
    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async postTeamGoals(body: MatchType): ServiceResponseType<IMatches> {
    const data = await this.matchesModel.postTeamGoals(body);
    if (!data) return { status: 'BAD_REQUEST', data: { message: 'Not created' } };
    return { status: 'CREATED', data };
  }
}
