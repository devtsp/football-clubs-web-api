const makeAddClub = require('./add-club.service');
const makeFindClub = require('./find-club.service');
const makeListClubs = require('./list-clubs.service');
const clubRepo = require('../repository');

// repository (framework/drivers = lower layer)
// injected into -->
// entities (enterprise business rules = highest layer)
const addClub = makeAddClub(clubRepo);
const findClub = makeFindClub(clubRepo);
const listClubs = makeListClubs(clubRepo);

module.exports = Object.freeze({ addClub, findClub, listClubs });
