module.exports = function makeSequelizeClubsRepo({ DataTypes, sequelize }) {
	const Club = sequelize.define('Club', {
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

	async function insert(clubInstance) {
		const result = await Club.create(clubInstance);
		return result;
	}

	async function selectById(id) {
		const found = Club.findByPk(id);
		return found;
	}

	async function selectByName(clubName) {
		const found = Club.findOne({ where: { clubName } });
		return found;
	}

	async function selectAll() {
		const found = Club.findAll();
		return found;
	}

	return Object.freeze({
		insert,
		selectAll,
		selectById,
		selectByName,
	});
};
