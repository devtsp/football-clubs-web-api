module.exports = function makeSequelizeClubsRepo({ DataTypes, sequelize }) {
	const Player = sequelize.define('Player', {
		playerId: {
			type: DataTypes.STRING,
			allowNull: false,
			primaryKey: true,
		},
		playerFirstName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		playerLastName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		playerAge: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		playerPosition: {
			type: DataTypes.NUMBER,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
		},
	});

	async function insert(clubInstance) {
		const result = await Player.create(clubInstance);
		return result;
	}

	async function selectById(id) {
		const found = Player.findByPk(id);
		return found;
	}

	async function selectByName(playerName) {
		const found = Player.findOne({ where: { playerName } });
		return found;
	}

	async function selectAll() {
		const found = Player.findAll();
		return found;
	}

	return Object.freeze({
		insert,
		selectAll,
		selectById,
		selectByName,
	});
};
