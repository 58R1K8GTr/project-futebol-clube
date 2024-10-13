import MatchClass from '../classes/matchClass';
import TeamClass from '../classes/teamClass';
import LeaderboardClass from '../classes/leaderBoardClass';
import { IMatchesWithTeams } from '../Interfaces/IMatchesWithTeams';
import { ILeaderboard } from '../Interfaces/ILeaderboard';
import MatchesSequelize from '../database/models/MatchesSequelize';
import TeamsSequelize from '../database/models/TeamsSequelize';

export default class LeaderboardModel {
  constructor(
    private matchModel = MatchesSequelize,
    private _leaderboard: LeaderboardClass = new LeaderboardClass(),
  ) { }

  public async getLeaderboardHome(): Promise<ILeaderboard[]> {
    const teamsMap: { [teamName: string]: TeamClass } = {};
    this._leaderboard = new LeaderboardClass();
    const finalizedMatches = await this.getFinalizedMatches();
    // refatorar e colocar em uma classe essa constante e botar na service?
    finalizedMatches.forEach((match) => {
      [match.homeTeam.teamName, match.awayTeam.teamName].forEach((teamName) => {
        if (!teamsMap[teamName]) {
          teamsMap[teamName] = new TeamClass(teamName);
          this._leaderboard.addTeam(teamsMap[teamName]);
        }
      });
      const homeTeam = teamsMap[match.homeTeam.teamName];
      const awayTeam = teamsMap[match.awayTeam.teamName];
      this._leaderboard
        .addMatch(new MatchClass(homeTeam, awayTeam, match.homeTeamGoals, match.awayTeamGoals));
    });
    return this._leaderboard.getLeaderboardHome();
  }

  private async getFinalizedMatches(): Promise<IMatchesWithTeams[]> {
    return await this.matchModel.findAll({
      where: { inProgress: false },
      include: [
        { model: TeamsSequelize, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsSequelize, as: 'awayTeam', attributes: ['teamName'] },
      ],
      raw: true,
      nest: true,
    }) as unknown as IMatchesWithTeams[];
  }
}
