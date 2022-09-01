module.exports = function buildMakeClub() {
	/**
	 * @param {Number} clubId
	 * @param {String} clubName
	 * @param {String} clubTLA
	 * @param {String} clubCrestURL
	 * @param {String} createdAt
	 * @param {String} updatedAt
	 * @returns {Object}
	 */
	return function makeClub({
		clubId,
		clubName,
		clubTLA,
		clubCrestURL,
		createdAt = Date.now(),
		updatedAt = Date.now(),
	} = {}) {
		if (!clubId) {
			throw new Error('Club must have an Id');
		}
		if (!clubName) {
			throw new Error('Club must have a name');
		}
		if (!clubTLA) {
			throw new Error('Club must have a TLA');
		}
		if (!clubCrestURL) {
			throw new Error('Club must have a crest');
		}

		return Object.freeze({
			getId: () => clubId,
			getName: () => clubName,
			getTLA: () => clubTLA,
			getCrestURL: () => clubCrestURL,
			getCreatedAt: () => createdAt,
			getUpdatedAt: () => updatedAt,
		});
	};
};
