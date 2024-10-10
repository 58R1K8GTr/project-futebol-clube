import { IMatchesModel } from '../Interfaces/IMatchesModel';
import MatchesSequelize from '../database/models/MatchesSequelize';
import { IMatchesWithTeams } from '../Interfaces/IMatchesWithTeams';
import TeamsSequelize from '../database/models/TeamsSequelize';

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
      ({ inProgress, ...rest }) => ({ inProgress: Boolean(inProgress), ...rest }),
    );
    return newData as unknown as IMatchesWithTeams[];
  }
}
