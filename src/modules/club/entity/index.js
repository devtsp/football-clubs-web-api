const buildClubClass = require('./build-club');
const Id = require('../../../helpers/generate-id.helper');

const Club = buildClubClass({ Id });

module.exports = Club;
