import TeamClass from '../classes/teamClass';

export interface IMatchClass {
  finalizeMatchHome(): void;
  finalizeMatchAway(): void;
  finalizeAllMatches(): void;
  getHomeTeam(): TeamClass;
  getAwayTeam(): TeamClass;
  isMatchFinalized(): boolean;
}
