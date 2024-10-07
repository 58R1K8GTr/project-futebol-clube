import { ServiceResponseType } from '../types/ServiceResponseTypes';
import { ITeams } from '../Interfaces/ITeams';
import { ITeamsModel } from '../Interfaces/ITeamsModel';
import Teams from '../models/Teams';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamsModel = new Teams(),
  ) { }

  public async getAllTeams(): Promise<ServiceResponseType<ITeams[]>> {
    const teams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: teams };
  }
}
