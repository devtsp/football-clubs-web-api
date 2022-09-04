const express = require('express');

const expressCallback = require('./express-callback');

module.exports = function makeExpressApp({ clubController }) {
	const app = express();
	app.use(express.json());
	app.get('/clubs/:id', expressCallback(clubController.getById));
	app.get('/clubs', expressCallback(clubController.getAll));
	app.post('/clubs', expressCallback(clubController.post));
	return app;
};
