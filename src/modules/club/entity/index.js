const buildMakeClub = require('./Club');
const Id = require('../../helpers/generate-id');

const makeClub = buildMakeClub({ Id });

module.exports = makeClub;
