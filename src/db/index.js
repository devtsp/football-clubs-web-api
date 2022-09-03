const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite::memory:', { logging: false });

sequelize.define('Club', {
	clubId: {
		type: DataTypes.STRING,
		allowNull: false,
		primaryKey: true,
	},
	clubName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	clubTLA: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	clubCrestURL: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	createdAt: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	updatedAt: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

sequelize.sync();

sequelize
	.authenticate()
	.then(() => {
		console.log('>> DB Connected');
	})
	.catch(err => console.log('Error with the DB'));

module.exports = sequelize;
