const sequelize = require('../../../db');

const makeClubsRepo = require('./clubs.repository');

// sequelize DAO
// injected into -->
// repository factory
// both belong to interface layer but the repo layer expose the abstractions.
// The implementation details of sequelize are hidden to the consumers of the repo
// Despite injecting the DAO object, the coupling stills high (a change in the ORM will
// directly impact on the repo inner implementations)
const clubsRepo = makeClubsRepo(sequelize.models.Club);

module.exports = clubsRepo;
