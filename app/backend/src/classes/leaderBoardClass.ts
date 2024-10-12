import { ILeaderboard } from '../Interfaces/ILeaderboard';
import MatchClass from './matchClass';
import TeamClass from './teamClass';
import { ILeaderboardClass } from '../Interfaces/ILeaderboardClass';

export default class LeaderboardClass implements ILeaderboardClass {
  private teams: TeamClass[] = [];

  public addTeam(team: TeamClass): void {
    if (!this.teams.find((t) => t.getName() === team.getName())) {
      this.teams.push(team);
    }
  }

  public static addMatch(match: MatchClass): void {
    match.finalizeMatch();
  }

  public getLeaderboard(): ILeaderboard[] {
    const sortedTeams = this.teams
      .map((team) => team.getTeamData())
      .sort((teamA, teamB) => {
        if (teamB.totalPoints !== teamA.totalPoints) return teamB.totalPoints - teamA.totalPoints;
        if (teamB.totalVictories !== teamA.totalVictories) {
          return teamB.totalVictories - teamA.totalVictories;
        }
        if (teamB.goalsBalance !== teamA.goalsBalance) {
          return teamB.goalsBalance - teamA.goalsBalance;
        }
        return teamB.goalsFavor - teamA.goalsFavor;
      });

    return sortedTeams;
  }
}
