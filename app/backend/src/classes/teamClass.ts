import { ILeaderboard } from '../Interfaces/ILeaderboard';
import { ITeamClass } from '../Interfaces/ITeamClass';

export default class TeamClass implements ITeamClass {
  private name: string;
  private totalPoints: number;
  private totalGames: number;
  private totalVictories: number;
  private totalDraws: number;
  private totalLosses: number;
  private goalsFavor: number;
  private goalsOwn: number;
  private goalsBalance: number;
  private efficiency: number;

  constructor(name: string) {
    this.name = name;
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
  }

  public updateStats(goalsFavor: number, goalsOwn: number): void {
    this.totalGames += 1;
    this.goalsFavor += goalsFavor;
    this.goalsOwn += goalsOwn;
    this.goalsBalance = this.goalsFavor - this.goalsOwn;

    if (goalsFavor > goalsOwn) {
      this.totalVictories += 1;
      this.totalPoints += 3;
    } else if (goalsFavor === goalsOwn) {
      this.totalDraws += 1;
      this.totalPoints += 1;
    } else {
      this.totalLosses += 1;
    }

    this.calculateEfficiency();
  }

  private calculateEfficiency(): void {
    if (this.totalGames === 0) {
      this.efficiency = 0;
    } else {
      this.efficiency = Number(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));
    }
  }

  public getTeamData(): ILeaderboard {
    return {
      name: this.name,
      totalPoints: this.totalPoints,
      totalGames: this.totalGames,
      totalVictories: this.totalVictories,
      totalDraws: this.totalDraws,
      totalLosses: this.totalLosses,
      goalsFavor: this.goalsFavor,
      goalsOwn: this.goalsOwn,
      goalsBalance: this.goalsBalance,
      efficiency: this.efficiency,
    };
  }

  public getName(): string {
    return this.name;
  }
}
