import { IMatches } from '../Interfaces/IMatches';

export type GoalsType = Pick<IMatches, 'homeTeamGoals' | 'awayTeamGoals'> | null;
