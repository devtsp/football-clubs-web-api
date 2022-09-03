const { addClub, findClub, listClubs } = require('../service');
const makePostClub = require('./post-club.controller');
const makeGetClub = require('./get-club.controller');
const makeGetAllClubs = require('./get-clubs.controller');

// services (app business rules = higher layer)
// injected into -->
// controllers (interface adapters = lower layer)
const postClub = makePostClub(addClub);
const getClub = makeGetClub(findClub);
const getAllClubs = makeGetAllClubs(listClubs);

module.exports = Object.freeze({ postClub, getClub, getAllClubs });
