const express = require('express');

const expressCallback = require('./express-callback');

module.exports = function makeExpressApp({ clubControllers }) {
	const app = express();
	app.use(express.json());
	app.get('/clubs/:id', expressCallback(clubControllers.getClubController));
	app.get('/clubs', expressCallback(clubControllers.getAllClubsController));
	app.post('/clubs', expressCallback(clubControllers.postClubController));
	return app;
};
