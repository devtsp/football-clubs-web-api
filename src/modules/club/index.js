const makeClubServices = require('./services');
const makeClubControllers = require('./controllers');

module.exports = function initClubsModule(clubRepository) {
	const clubServices = makeClubServices(clubRepository);
	const clubControllers = makeClubControllers(clubServices);
	return Object.freeze(clubControllers);
};
