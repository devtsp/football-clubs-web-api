const makeClub = require('../entity');

module.exports = function makeAddClub(clubRepo) {
	return async function addClub(clubInfo) {
		const exists = await clubRepo.selectByName(clubInfo?.clubName);

		if (exists) {
			throw new Error('Club with that name already exists');
		}

		// entity (enterprise business rules = highest layer)
		// direct dependency of -->
		// service (app business rules = lower layer)
		const { getName, getTLA, getCrestURL, getId, getCreatedAt, getUpdatedAt } =
			makeClub(clubInfo);

		const created = {
			clubName: getName(),
			clubTLA: getTLA(),
			clubCrestURL: getCrestURL(),
			clubId: getId(),
			createdAt: getCreatedAt(),
			updatedAt: getUpdatedAt(),
		};

		return await clubRepo.insert(created);
	};
};
