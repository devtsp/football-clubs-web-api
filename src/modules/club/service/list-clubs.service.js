module.exports = function makeListClubs(clubRepo) {
	return async function listClubs() {
		const result = await clubRepo.selectAll();
		return result;
	};
};
