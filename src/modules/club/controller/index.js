const { addClub, findClub, listClubs } = require('../service');
const makePostClub = require('./post-club');
const makeGetClub = require('./get-club');
const makeGetAllClubs = require('./get-clubs');

const postClub = makePostClub(addClub);
const getClub = makeGetClub(findClub);
const getAllClubs = makeGetAllClubs(listClubs);

module.exports = Object.freeze({ postClub, getClub, getAllClubs });
