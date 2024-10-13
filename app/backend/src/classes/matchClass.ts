import { IMatchClass } from '../Interfaces/IMatchClass';
import TeamClass from './teamClass';

export default class MatchClass implements IMatchClass {
  private homeTeam: TeamClass;
  private awayTeam: TeamClass;
  private homeTeamGoals: number;
  private awayTeamGoals: number;
  private isFinalized: boolean;

  constructor(
    homeTeam: TeamClass,
    awayTeam: TeamClass,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.homeTeamGoals = homeTeamGoals;
    this.awayTeamGoals = awayTeamGoals;
    this.isFinalized = false;
  }

  public finalizeMatchHome(): void {
    this.homeTeam.updateStats(this.homeTeamGoals, this.awayTeamGoals);
    this.finalizeMatch();
  }

  public finalizeMatchAway(): void {
    this.awayTeam.updateStats(this.awayTeamGoals, this.homeTeamGoals);
    this.finalizeMatch();
  }

  public finalizeAllMatches(): void {
    this.homeTeam.updateStats(this.homeTeamGoals, this.awayTeamGoals);
    this.awayTeam.updateStats(this.awayTeamGoals, this.homeTeamGoals);
    this.finalizeMatch();
  }

  private finalizeMatch(): void {
    if (!this.isFinalized) {
      this.isFinalized = true;
    }
  }

  public getHomeTeam(): TeamClass {
    return this.homeTeam;
  }

  public getAwayTeam(): TeamClass {
    return this.awayTeam;
  }

  public isMatchFinalized(): boolean {
    return this.isFinalized;
  }
}
