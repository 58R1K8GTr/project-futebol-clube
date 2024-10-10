import db from './config';
import TeamsSequelize from './TeamsSequelize';
import MatchesSequelize from './MatchesSequelize';

TeamsSequelize.hasMany(MatchesSequelize, { foreignKey: 'homeTeamId', as: 'homeMatches' });
TeamsSequelize.hasMany(MatchesSequelize, { foreignKey: 'awayTeamId', as: 'awayMatches' });
MatchesSequelize.belongsTo(TeamsSequelize, { foreignKey: 'homeTeamId', as: 'homeTeam' });
MatchesSequelize.belongsTo(TeamsSequelize, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default db;
