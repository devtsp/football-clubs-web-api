const sanitize = require('sanitize-html');

module.exports = function sanitizeHTML(string) {
	return sanitize(string);
};
