module.exports = function makeClubsRepo(sequelizeModel) {
	async function insert(clubInstance) {
		const result = await sequelizeModel.create(clubInstance);
		return result;
	}

	async function selectById(id) {
		const found = sequelizeModel.findByPk(id);
		return found;
	}

	async function selectAll() {
		const found = sequelizeModel.findAll();
		return found;
	}

	return Object.freeze({
		insert,
		selectAll,
		selectById,
	});
};
