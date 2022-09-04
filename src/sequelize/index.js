const { Sequelize, DataTypes } = require('sequelize');

const makeClubRepo = require('./club');

module.exports = async function makeSequelizeDB(...args) {
	const sequelize = new Sequelize(...args);

	const clubRepository = makeClubRepo({ DataTypes, sequelize });

	await sequelize.sync({ force: true });
	await sequelize.authenticate();

	return Object.freeze({ clubRepository });
};
