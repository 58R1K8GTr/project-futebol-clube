import TeamsSequelize from '../../database/models/TeamsSequelize';

export default async function teamExists(id: number): Promise<boolean> {
  const team = await TeamsSequelize.findOne({ where: { id }, raw: true, nest: true });
  return Boolean(team);
}
