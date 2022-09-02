module.exports = function buildMakeClub({ Id }) {
	/**
	 * @param {Number} clubId
	 * @param {String} clubName
	 * @param {String} clubTLA
	 * @param {String} clubCrestURL
	 * @param {String} createdAt
	 * @param {String} updatedAt
	 * @returns {Object}
	 */
	return function makeClub({ clubName, clubTLA, clubCrestURL } = {}) {
		if (!clubName) {
			throw new Error('Club must have a name');
		}
		if (/[\d\W]/.test(clubName)) {
			throw new Error('Club Name invalid');
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
			/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/.test(
				clubTLA
			)
		) {
			throw new Error('Club crest has to be a valid URL');
		}

		const clubId = Id.generateId();
		const timeStamp = Date.now();

		return Object.freeze({
			getId: () => clubId,
			getName: () => clubName,
			getTLA: () => clubTLA,
			getCrestURL: () => clubCrestURL,
			getCreatedAt: () => timeStamp,
			getUpdatedAt: () => timeStamp,
		});
	};
};
