const buildMakeClub = require('./Club');
const Id = require('../../helpers/generate-id.helper');

const makeClub = buildMakeClub({ Id });

module.exports = makeClub;
