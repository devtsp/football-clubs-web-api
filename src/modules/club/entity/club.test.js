const makeClub = require('./index');

const makeFakeClub = propToModify => {
	const modifiedClub = {
		clubId: 1,
		clubName: 'valid',
		clubTLA: 'TLA',
		clubCrestURL: 'http://crest.com/1',
		createdAt: 12321321,
		updatedAt: 1231231123,
		...propToModify,
	};
	return modifiedClub;
};

describe('Club', () => {
	test('must have an Id', () => {
		const club = makeFakeClub({ clubId: null });
		expect(() => makeClub(club)).toThrow('Club must have an Id');
	});
	test('must have an name', () => {
		const club = makeFakeClub({ clubName: null });
		expect(() => makeClub(club)).toThrow('Club must have a name');
	});
	test('must have a TLA', () => {
		const club = makeFakeClub({ clubTLA: null });
		expect(() => makeClub(club)).toThrow('Club must have a TLA');
	});
	test('must have a crest', () => {
		const club = makeFakeClub({ clubCrestURL: null });
		expect(() => makeClub(club)).toThrow('Club must have a crest');
	});
	test('auto generates a creation timestamp', () => {
		const club = makeFakeClub({ cretedAt: null });
		expect(() => makeClub(club)).not.toThrow();
		const createdClub = makeClub(club);
		expect(createdClub.getCreatedAt()).toBeDefined();
	});
	test('auto generates an update timestamp', () => {
		const club = makeFakeClub({ updatedAt: null });
		expect(() => makeClub(club)).not.toThrow();
		const createdClub = makeClub(club);
		expect(createdClub.getUpdatedAt()).toBeDefined();
	});
});
