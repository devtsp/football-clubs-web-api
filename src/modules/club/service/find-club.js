module.exports = function makeFindClub(clubRepo) {
	return async function findClub(id) {
		const result = await clubRepo.selectById(id);
		return result;
	};
};
