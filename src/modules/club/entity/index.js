const buildMakeClub = require('./Club');
const Id = require('../../helpers/generate-id.helper');

// call entity creator builder passing injected deps
const makeClub = buildMakeClub({ Id });

module.exports = makeClub;
