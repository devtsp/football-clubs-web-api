const Club = require('../Club');

const fakeFields = {
	clubName: 'valid',
	clubTLA: 'TLA',
	clubCrestURL: 'http://crest.com/',
};

describe('>> Club', () => {
	test('Autogenerates an Id', () => {
		expect(new Club(fakeFields).getId()).toBeDefined();
	});

	test('Must have an name', () => {
		expect(() => new Club({ ...fakeFields, clubName: null })).toThrow(
			'Club must have a name'
		);
		expect(() => new Club({ ...fakeFields, clubName: '' })).toThrow(
			'Club must have a name'
		);
		expect(() => new Club({ ...fakeFields, clubName: undefined })).toThrow(
			'Club must have a name'
		);
	});

	test('Must have a TLA', () => {
		expect(() => new Club({ ...fakeFields, clubTLA: null })).toThrow(
			'Club must have a TLA'
		);
	});

	test('Must have a valid TLA', () => {
		expect(() => new Club({ ...fakeFields, clubTLA: 'asdasdasd' })).toThrow(
			'Club TLA must be 3 alphabetic characters'
		);
		expect(() => new Club({ ...fakeFields, clubTLA: '123' })).toThrow(
			'Club TLA must be 3 alphabetic characters'
		);
		expect(() => new Club({ ...fakeFields, clubTLA: '1a3' })).toThrow(
			'Club TLA must be 3 alphabetic characters'
		);
	});

	test('Must have a crest', () => {
		expect(() => new Club({ ...fakeFields, clubCrestURL: null })).toThrow(
			'Club must have a crest'
		);
	});

	test('Autogenerates a creation timestamp', () => {
		expect(new Club(fakeFields).getCreatedAt()).toBeDefined();
	});

	test('Autogenerates an update timestamp', () => {
		expect(new Club(fakeFields).getUpdatedAt()).toBeDefined();
	});

	test('Must have a valid name', () => {
		expect(() => new Club({ ...fakeFields, clubName: '!"#' })).toThrow(
			'Invalid club name'
		);
	});

	test('Must have a valid URL crest', () => {
		expect(
			() => new Club({ ...fakeFields, clubCrestURL: 'adsfknadslñas' })
		).toThrow('Club crest has to be a valid URL');
	});

	test('Return object must provide proper getter methods', () => {
		expect(new Club(fakeFields).getId()).toBeDefined();
	});

	test('Club entity throws when no fields passed at all', () => {
		expect(() => new Club()).toThrow('Missing required fields');
	});
});
