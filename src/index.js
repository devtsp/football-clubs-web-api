const express = require('express');

const expressCallback = require('./express-callback');
const { postClub, getClub, getAllClubs } = require('./modules/club/controller');
const app = express();

app.use(express.json());

// controllers (interface adapters = higher layer)
// injected into -->
// express interface (framework / drivers  = lower layer)
app.get('/clubs/:id', expressCallback(getClub));
app.get('/clubs', expressCallback(getAllClubs));
app.post('/clubs', expressCallback(postClub));

app.listen(8080, () => {
	console.log('>> Server is listening on port 8080');
});
