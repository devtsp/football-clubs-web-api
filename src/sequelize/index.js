const { Sequelize, DataTypes } = require('sequelize');

const makeClubRepo = require('./club');

module.exports = function makeSequelizeDB({ connectionString, options }) {
	const sequelize = new Sequelize(connectionString, options);

	const clubRepository = makeClubRepo({ DataTypes, sequelize });

	sequelize.sync();
	sequelize
		.authenticate()
		.then(() => {
			console.log('>> DB Connected');
		})
		.catch(err => console.log('Error with the DB'));

	return Object.freeze({ clubRepository });
};
