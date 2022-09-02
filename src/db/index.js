const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(':sqlite::memory:');

sequelize.define('Club', {
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
});

sequelize.sync();

module.exports = sequelize;
