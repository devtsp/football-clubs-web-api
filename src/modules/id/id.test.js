const Id = require('./Id');

describe('Id', () => {
	test('generates valid id', () => {
		const { generateId, validateId } = Id;
		expect(validateId(generateId())).toBe(true);
	});
});
