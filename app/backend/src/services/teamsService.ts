import { ServiceResponseType } from '../types/ServiceResponseTypes';
import { ITeam } from '../Interfaces/ITeam';
import { ITeamModel } from '../Interfaces/ITeamModel';
import Teams from '../models/Team';

export default class TeamsService {
  constructor(
    private teamsModel: ITeamModel = new Teams(),
  ) { }

  public async getAllTeams(): ServiceResponseType<ITeam[]> {
    const teams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: teams };
  }

  public async getById(id: number): ServiceResponseType<ITeam> {
    const team = await this.teamsModel.findById(id);
    if (!team) return { status: 'NOT_FOUND', data: { message: 'Team not found' } };
    return { status: 'SUCCESSFUL', data: team };
  }
}
