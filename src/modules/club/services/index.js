const makeClub = require('../entity');
const {
	ClubAlreadyExistsError,
	ClubMissingRequiredFieldsError,
	ClubIdUndefinedError,
} = require('./errors');

module.exports = function makeClubServices(clubsRepo) {
	async function addClubService({ clubName, clubTLA, clubCrestURL } = {}) {
		if (!clubName || !clubTLA || !clubCrestURL) {
			throw new ClubMissingRequiredFieldsError(
				'Missing required club fields to add club'
			);
		}
		const exists = await clubsRepo.selectByName(clubName);

		if (exists) {
			throw new ClubAlreadyExistsError('Club with that name already exists');
		}

		const { getName, getTLA, getCrestURL, getId, getCreatedAt, getUpdatedAt } =
			makeClub({ clubName, clubTLA, clubCrestURL });

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
		if (!id) {
			throw new ClubIdUndefinedError('Missing required club ID to search club');
		}
		const result = await clubsRepo.selectById(id);
		return result;
	}

	async function listClubsService() {
		const result = await clubsRepo.selectAll();
		return result;
	}

	return Object.freeze({ addClubService, findClubService, listClubsService });
};
