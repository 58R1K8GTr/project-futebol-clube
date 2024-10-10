import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from './config';
// import MatchesSequelize from './MatchesSequelize';

class TeamsSequelize extends Model<InferAttributes<TeamsSequelize>,
InferCreationAttributes<TeamsSequelize>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}

TeamsSequelize.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: DataTypes.STRING,
  },
}, {
  sequelize: db,
  modelName: 'teams',
  timestamps: false,
  underscored: true,
});

// TeamsSequelize.hasMany(MatchesSequelize, { foreignKey: 'homeTeamId', as: 'homeMatches' });
// TeamsSequelize.hasMany(MatchesSequelize, { foreignKey: 'awayTeamId', as: 'awayMatches' });
// MatchesSequelize.belongsTo(TeamsSequelize, { foreignKey: 'homeTeamId', as: 'homeTeam' });
// MatchesSequelize.belongsTo(TeamsSequelize, { foreignKey: 'awayTeamId', as: 'awayTeam' });

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default TeamsSequelize;
