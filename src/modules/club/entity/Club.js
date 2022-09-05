const IdService = require('../../../helpers/generate-id.helper');

module.exports = class Club {
	constructor({ clubName, clubTLA, clubCrestURL } = {}) {
		if (!clubName && !clubTLA && !clubCrestURL) {
			throw new Error('Missing required fields');
		}
		if (!clubName) {
			throw new Error('Club must have a name');
		}
		if (/[^A-Za-z ']/.test(clubName)) {
			throw new Error('Invalid club name');
		}
		if (!clubTLA) {
			throw new Error('Club must have a TLA');
		}
		if (/[\d\W]/.test(clubTLA) || clubTLA.length !== 3) {
			throw new Error('Club TLA must be 3 alphabetic characters');
		}
		if (!clubCrestURL) {
			throw new Error('Club must have a crest');
		}
		if (
			!/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/.test(
				clubCrestURL
			)
		) {
			throw new Error('Club crest has to be a valid URL');
		}
		this.clubName = clubName;
		this.clubTLA = clubTLA;
		this.clubCrestURL = clubCrestURL;
		this.clubId = IdService.generateId();
		this.timeStamp = Date.now();
	}

	getId = () => this.clubId;
	getName = () => this.clubName;
	getTLA = () => this.clubTLA;
	getCrestURL = () => this.clubCrestURL;
	getCreatedAt = () => this.timeStamp;
	getUpdatedAt = () => this.timeStamp;
};
