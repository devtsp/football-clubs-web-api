const makeAddClub = require('./add-club');
const makeFindClub = require('./find-club');
const makeListClubs = require('./list-clubs');
const clubRepo = require('../repository');

const addClub = makeAddClub(clubRepo);
const findClub = makeFindClub(clubRepo);
const listClubs = makeListClubs(clubRepo);

module.exports = Object.freeze({ addClub, findClub, listClubs });
