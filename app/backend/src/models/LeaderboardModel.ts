import { IMatchesWithTeams } from '../Interfaces/IMatchesWithTeams';
import { ILeaderboard } from '../Interfaces/ILeaderboard';
import MatchesSequelize from '../database/models/MatchesSequelize';
import TeamsSequelize from '../database/models/TeamsSequelize';

type TeamStatsType = {
  [teamName: string]: ILeaderboard;
};

type UpdateTeamStatsParamsType = [
  teamsStats: TeamStatsType,
  teamName: string,
  goalsFavor: number,
  goalsAgainst: number,
];

export default class LeaderboardModel {
  constructor(
    private model = MatchesSequelize,
  ) { }

  public static async getLeaderboardHome(): Promise<ILeaderboard[]> {
    const finalizedMatches = await LeaderboardModel.getFinalizedMatches();
    const teamsStats = LeaderboardModel.processMatches(finalizedMatches);
    return LeaderboardModel.calculateFinalLeaderboard(teamsStats);
  }

  private static async getFinalizedMatches(): Promise<IMatchesWithTeams[]> {
    return MatchesSequelize.findAll({
      where: { inProgress: false },
      include: [
        { model: TeamsSequelize, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamsSequelize, as: 'awayTeam', attributes: ['teamName'] },
      ],
      raw: true,
      nest: true,
    }) as unknown as IMatchesWithTeams[];
  }

  public static processMatches(matches: IMatchesWithTeams[]): TeamStatsType {
    const teamsStats: TeamStatsType = {};
    matches.forEach((match) => {
      const { homeTeam, homeTeamGoals, awayTeamGoals, awayTeam } = match;
      LeaderboardModel
        .updateTeamStats([teamsStats, homeTeam.teamName, homeTeamGoals, awayTeamGoals]);
      LeaderboardModel
        .updateTeamStats([teamsStats, awayTeam.teamName, awayTeamGoals, homeTeamGoals]);
    });

    return teamsStats;
  }

  public static updateTeamStats(params: UpdateTeamStatsParamsType): void {
    const [teamsStats, teamName, goalsFavor, goalsAgainst] = params;
    if (!teamsStats[teamName]) {
      teamsStats[teamName] = LeaderboardModel.initializeTeamStats(teamName);
    }

    const team = teamsStats[teamName];
    team.totalGames += 1;
    team.goalsFavor += goalsFavor;
    team.goalsOwn += goalsAgainst;
    team.goalsBalance = team.goalsFavor - team.goalsOwn;

    if (goalsFavor > goalsAgainst) {
      team.totalVictories += 1;
      team.totalPoints += 3;
    } else if (goalsFavor === goalsAgainst) {
      team.totalDraws += 1;
      team.totalPoints += 1;
    } else {
      team.totalLosses += 1;
    }
  }

  public static initializeTeamStats(teamName: string): ILeaderboard {
    return {
      name: teamName,
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    };
  }

  public static calculateFinalLeaderboard(teamsStats: TeamStatsType): ILeaderboard[] {
    const teamsArray = Object.keys(teamsStats).map((teamName) => {
      const teamStats = teamsStats[teamName as keyof TeamStatsType];
      teamStats.efficiency = LeaderboardModel
        .calculateEfficiency(teamStats.totalPoints, teamStats.totalGames);
      return teamStats;
    });

    return this.sortTeams(teamsArray);
  }

  public static calculateEfficiency(totalPoints: number, totalGames: number): number {
    if (totalGames === 0) return 0;
    return Number(((totalPoints / (totalGames * 3)) * 100).toFixed(2));
  }

  public static sortTeams(teams: ILeaderboard[]): ILeaderboard[] {
    return teams.sort((teamA, teamB) => {
      if (teamB.totalPoints !== teamA.totalPoints) return teamB.totalPoints - teamA.totalPoints;
      if (teamB.totalVictories !== teamA.totalVictories) {
        return teamB.totalVictories - teamA.totalVictories;
      }
      if (teamB.goalsBalance !== teamA.goalsBalance) return teamB.goalsBalance - teamA.goalsBalance;
      return teamB.goalsFavor - teamA.goalsFavor;
    });
  }
}
