import teamExists from '../../utils/db/teamExists';
import { MatchType } from '../../types/MatchesModelType';

export function equalTeams(match: MatchType): boolean {
  const { homeTeamId, awayTeamId } = match;
  return homeTeamId === awayTeamId;
}

export async function teamsDontExist(match: MatchType): Promise<boolean> {
  const { homeTeamId, awayTeamId } = match;
  const result = await Promise.all([
    teamExists(homeTeamId), teamExists(awayTeamId),
  ]);
  return !result.every(Boolean);
}
