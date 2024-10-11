import { IMatches } from '../Interfaces/IMatches';

export type GoalsType = Pick<IMatches, 'homeTeamGoals' | 'awayTeamGoals'> | null;

export type MatchType = Pick<
IMatches,
'awayTeamGoals' | 'awayTeamId' | 'homeTeamGoals' | 'homeTeamId'
>;
