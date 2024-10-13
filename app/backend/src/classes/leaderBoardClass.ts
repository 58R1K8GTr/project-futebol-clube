import { ILeaderboard } from '../Interfaces/ILeaderboard';
import MatchClass from './matchClass';
import TeamClass from './teamClass';
import { ILeaderboardClass } from '../Interfaces/ILeaderboardClass';

type TeamsAttributeType = {
  [teamName: string]: TeamClass;
};

export default class LeaderboardClass implements ILeaderboardClass {
  private teams: TeamsAttributeType = {};
  private matches: MatchClass[] = [];

  public addTeam(team: TeamClass): void {
    const teamName = team.getName();
    if (!this.teams[teamName]) {
      this.teams[teamName] = team;
    }
  }

  public addMatch(match: MatchClass): void {
    this.matches.push(match);
  }

  public getLeaderboardHome(): ILeaderboard[] {
    const teams = new Set<TeamClass>();
    this.matches.forEach((match) => {
      match.finalizeMatchHome();
      teams.add(match.getHomeTeam());
    });
    return LeaderboardClass.getLeaderboard(Array.from(teams));
  }

  public getLeaderboardAway(): ILeaderboard[] {
    const teams = new Set<TeamClass>();
    this.matches.forEach((match) => {
      match.finalizeMatchAway();
      teams.add(match.getAwayTeam());
    });
    return LeaderboardClass.getLeaderboard(Array.from(teams));
  }

  public getLeaderboardFull(): ILeaderboard[] {
    this.matches.forEach((match) => match.finalizeAllMatches());
    return LeaderboardClass.getLeaderboard(Object.values(this.teams));
  }

  public static getLeaderboard(teamsArray: TeamClass[]): ILeaderboard[] {
    return teamsArray
      .map((team) => team.getTeamData())
      .sort(LeaderboardClass.compareTeams);
  }

  private static compareTeams(teamA: ILeaderboard, teamB: ILeaderboard): number {
    if (teamB.totalPoints !== teamA.totalPoints) return teamB.totalPoints - teamA.totalPoints;
    if (teamB.totalVictories !== teamA.totalVictories) {
      return teamB.totalVictories - teamA.totalVictories;
    }
    if (teamB.goalsBalance !== teamA.goalsBalance) return teamB.goalsBalance - teamA.goalsBalance;
    return teamB.goalsFavor - teamA.goalsFavor;
  }
}
