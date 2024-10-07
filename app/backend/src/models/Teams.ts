import { ITeamsModel } from '../Interfaces/ITeamsModel';
import TeamsSequelize from '../database/models/TeamsSequelize';
import { ITeams } from '../Interfaces/ITeams';

export default class TeamsModel implements ITeamsModel {
  private model = TeamsSequelize;

  async findAll(): Promise<ITeams[]> {
    const data = await this.model.findAll({ raw: true });
    return data;
  }
}
