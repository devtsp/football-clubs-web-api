const { Sequelize, DataTypes } = require('sequelize');

const makeClubRepo = require('./club');

module.exports = function makeSequelizeDB(...args) {
	const sequelize = new Sequelize(...args);

	const clubRepository = makeClubRepo({ DataTypes, sequelize });

	sequelize.sync({ force: true });
	sequelize
		.authenticate()
		.then(() => {
			console.log('>> DB Connected');
		})
		.catch(err => console.log('Error with the DB'));

	return Object.freeze({ clubRepository });
};
