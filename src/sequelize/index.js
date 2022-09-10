const { Sequelize, DataTypes } = require('sequelize');

const makeClubRepository = require('./club');
const player = require('./player');
const makePlayerRepository = require('./player');

module.exports = async function makeSequelizeDB(...args) {
	// SEQUELIZE INSTANCE TO PASS TO MODEL CREATORS
	const sequelize = new Sequelize(...args);

	// MODELS
	const clubRepository = makeClubRepository({ DataTypes, sequelize });
	const playerRepository = makePlayerRepository({ DataTypes, sequelize });

	// ASSOCIATIONS
	playerRepository.belongsTo(clubRepository, { foreignKey: 'club_id' });
	clubRepository.hasMany(playerRepository);

	await sequelize.sync({ force: true });
	await sequelize.authenticate();

	return Object.freeze({ clubRepository, playerRepository });
};
