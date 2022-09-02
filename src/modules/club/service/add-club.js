const makeClub = require('../entity');

module.exports = function makeAddClub(clubRepo) {
	return async function addClub({ clubInfo }) {
		const exists = await clubRepo.findByName(clubInfo.clubName);
		if (exists) {
			return exists;
		}
		return clubRepo.insert(makeClub(clubInfo));
	};
};
