const Club = require('../entity');
const {
	ClubAlreadyExistsError,
	ClubMissingRequiredFieldsError,
	ClubIdUndefinedError,
} = require('./errors');

module.exports = class ClubService {
	constructor(clubRepo) {
		this.clubRepo = clubRepo;
	}

	add = async ({ clubName, clubTLA, clubCrestURL } = {}) => {
		if (!clubName || !clubTLA || !clubCrestURL) {
			throw new ClubMissingRequiredFieldsError(
				'Missing required club fields to add club'
			);
		}
		const exists = await this.clubRepo.selectByName(clubName);
		if (exists) {
			throw new ClubAlreadyExistsError('Club with that name already exists');
		}
		const club = new Club({ clubName, clubTLA, clubCrestURL });
		return await this.clubRepo.insert(club);
	};

	findById = async id => {
		if (!id) {
			throw new ClubIdUndefinedError('Missing required club ID to search club');
		}
		const result = await this.clubRepo.selectById(id);
		return result;
	};

	index = async () => {
		const result = await this.clubRepo.selectAll();
		return result;
	};
};
