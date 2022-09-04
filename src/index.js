const makeSequelizeDB = require('./sequelize');
const makeExpressApp = require('./express');
const ClubService = require('./modules/club/service');
const ClubController = require('./modules/club/controller');

// INIT DB
makeSequelizeDB({
	dialect: 'sqlite',
	storage: 'db/sqlite.db',
	logging: false,
}).then(repos => {
	// BUILD CLUB CONTROLLER
	const clubService = new ClubService(repos.clubRepository);
	const clubController = new ClubController(clubService);

	// APP
	const app = makeExpressApp({ clubController });

	// SERVE APP
	app.listen(8080, () => {
		console.log('>> Server is listening on port 8080');
	});
});
