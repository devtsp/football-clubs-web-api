const sequelize = require('../../../db/index');

const makeClubsRepo = require('./clubs-repo');

const clubsRepo = makeClubsRepo(sequelize.Club);

module.exports = clubsRepo;
