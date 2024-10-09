import { ITeamModel } from '../Interfaces/ITeamModel';
import TeamsSequelize from '../database/models/TeamsSequelize';
import { ITeam } from '../Interfaces/ITeam';

export default class TeamModel implements ITeamModel {
  private model = TeamsSequelize;

  async findAll(): Promise<ITeam[]> {
    const data = await this.model.findAll({ raw: true });
    return data;
  }

  async findById(id: number): Promise<ITeam | null> {
    const data = await this.model.findByPk(id, { raw: true });
    return data;
  }
}
