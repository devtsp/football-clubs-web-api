const makeClub = require('./index');

const fakeFields = {
	clubName: 'valid',
	clubTLA: 'TLA',
	clubCrestURL: 'http://crest.com/1',
};

describe('Club', () => {
	test('Autogenerates an Id', () => {
		expect(() => makeClub(fakeFields).getId()).toBeDefined();
	});
	test('Must have an name', () => {
		expect(() => makeClub({ ...fakeFields, clubName: null })).toThrow(
			'Club must have a name'
		);
		expect(() => makeClub({ ...fakeFields, clubName: '' })).toThrow(
			'Club must have a name'
		);
		expect(() => makeClub({ ...fakeFields, clubName: undefined })).toThrow(
			'Club must have a name'
		);
	});
	test('Must have a TLA', () => {
		expect(() => makeClub({ ...fakeFields, clubTLA: null })).toThrow(
			'Club must have a TLA'
		);
	});
	test('Must have a valid TLA', () => {
		expect(() => makeClub({ ...fakeFields, clubTLA: 'asdasdasd' })).toThrow(
			'Club TLA must be 3 alphabetic characters'
		);
		expect(() => makeClub({ ...fakeFields, clubTLA: '123' })).toThrow(
			'Club TLA must be 3 alphabetic characters'
		);
		expect(() => makeClub({ ...fakeFields, clubTLA: '1a3' })).toThrow(
			'Club TLA must be 3 alphabetic characters'
		);
	});
	test('Must have a crest', () => {
		expect(() => makeClub({ ...fakeFields, clubCrestURL: null })).toThrow(
			'Club must have a crest'
		);
	});
	test('Autogenerates a creation timestamp', () => {
		expect(makeClub(fakeFields).getCreatedAt()).toBeDefined();
	});
	test('Autogenerates an update timestamp', () => {
		expect(makeClub(fakeFields).getUpdatedAt()).toBeDefined();
	});
});
