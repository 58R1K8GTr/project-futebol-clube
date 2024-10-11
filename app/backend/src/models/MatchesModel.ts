import { IMatchesModel } from '../Interfaces/IMatchesModel';
import MatchesSequelize from '../database/models/MatchesSequelize';
import { IMatchesWithTeams } from '../Interfaces/IMatchesWithTeams';
import TeamsSequelize from '../database/models/TeamsSequelize';
import { GoalsType, MatchType } from '../types/MatchesModelType';
import { IMatches } from '../Interfaces/IMatches';

export default class MatchesModel implements IMatchesModel {
  private model = MatchesSequelize;

  public async findAll(): Promise<IMatchesWithTeams[]> {
    const data = await this.model.findAll({
      include: [
        { model: TeamsSequelize, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsSequelize, as: 'awayTeam', attributes: ['teamName'] },
      ],
      raw: true,
      nest: true,
    });
    const newData = data.map(
      ({ inProgress, ...rest }) => ({ inProgress: Boolean(inProgress), ...rest }),
    );
    return newData as unknown as IMatchesWithTeams[];
  }

  public async findFilteredMatches(inProgressArgument: boolean): Promise<IMatchesWithTeams[]> {
    const data = await this.model.findAll({
      where: { inProgress: inProgressArgument },
      include: [
        { model: TeamsSequelize, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsSequelize, as: 'awayTeam', attributes: ['teamName'] },
      ],
      raw: true,
      nest: true,
    });
    const newData = data.map(
      ({ inProgress, ...rest }) => (
        { inProgress: Boolean(inProgress), ...rest }
      ),
    );
    return newData as unknown as IMatchesWithTeams[];
  }

  public async changeMatchToFinished(id: number): Promise<boolean> {
    const [updatedRows] = await this.model.update({ inProgress: false }, { where: { id } });
    return updatedRows > 0;
  }

  public async changeTeamGoals(id: number, body: GoalsType): Promise<boolean> {
    const [updatedRows] = await this.model.update({ ...body }, { where: { id } });
    return updatedRows > 0;
  }

  public async postTeamGoals(body: MatchType): Promise<IMatches> {
    const created = await this.model.create(body);
    return created;
  }
}
