const uuid = require('uuid');

module.exports = Object.freeze({
	generateId: uuid.v4,
	validateId: uuid.validate,
});
