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

  public finalizeMatch(): void {
    if (!this.isFinalized) {
      this.homeTeam.updateStats(this.homeTeamGoals, this.awayTeamGoals);
      this.awayTeam.updateStats(this.awayTeamGoals, this.homeTeamGoals);
      this.isFinalized = true;
    }
  }

  public isMatchFinalized(): boolean {
    return this.isFinalized;
  }
}
