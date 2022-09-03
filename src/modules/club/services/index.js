const makeClub = require('../entity');

module.exports = function makeClubServices(clubsRepo) {
	async function addClubService(clubInfo) {
		const exists = await clubsRepo.selectByName(clubInfo?.clubName);

		if (exists) {
			throw new Error('Club with that name already exists');
		}

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

		const result = await clubsRepo.insert(created);

		return result;
	}

	async function findClubService(id) {
		const result = await clubsRepo.selectById(id);
		return result;
	}

	async function listClubsService() {
		const result = await clubsRepo.selectAll();
		return result;
	}

	return Object.freeze({ addClubService, findClubService, listClubsService });
};
