const IdService = require('../../../helpers/generate-id.helper');

module.exports = class Player {
	constructor({
		playerFirstName,
		playerLastName,
		playerAge,
		playerPosition,
		clubId = null,
	} = {}) {
		if (!playerFirstName && !playerLastName && !playerAge && !playerPosition) {
			throw new Error('Missing required fields');
		}
		if (
			!typeof playerFirstName == 'string' ||
			!typeof playerLastName == 'string'
		) {
			throw new TypeError(
				'Player firstname and lastname must be of type: string'
			);
		}

		if (!playerFirstName.trim() || !playerLastName.trim()) {
			throw new Error('Player must have firstname and lastname');
		}
		if (/[^A-Za-z]/.test(playerFirstName)) {
			throw new Error('Invalid firstname');
		}
		if (/[^A-Za-z]/.test(playerLastName)) {
			throw new Error('Invalid lastname');
		}
		if (playerAge < 16 || playerAge > 45) {
			throw new Error('Player must be between 16 and 45 years old ');
		}
		if (playerPosition < 1 || playerPosition > 11) {
			throw new Error('Positions available for a player go between 1 and 11');
		}

		this.playerFirstName = playerFirstName;
		this.playerLastName = playerLastName;
		this.playerAge = playerAge;
		this.playerPosition = playerPosition;
		this.clubId = clubId;
		this.playerId = IdService.generateId();
		this.timeStamp = Date.now();
	}

	getId = () => this.playerId;
	getFirstName = () => this.playerFirstName;
	getLastName = () => this.playerLastName;
	getAge = () => this.playerAge;
	getPosition = () => this.playerPosition;
	getPClubId = () => this.clubId;
	getCreatedAt = () => this.timeStamp;
	getUpdatedAt = () => this.timeStamp;
};
