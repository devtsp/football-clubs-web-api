const makeClubsService = require('../index');

const db = [];

const repo = {
	insert: jest.fn(async data => db.push(data)),
	selectAll: jest.fn(async () => db),
	selectById: jest.fn(async id => db.filter(club => club.clubId == id)[0]),
	selectByName: jest.fn(
		async name => db.filter(club => club.clubName == name)[0]
	),
};

const { findClubService, listClubsService, addClubService } =
	makeClubsService(repo);

const mockFieldsTemplate = {
	clubName: 'Hello World',
	clubTLA: 'HLW',
	clubCrestURL: 'http://asdasd.com',
};

describe('club service', () => {
	test('findAllClubsService calls insert repo method', async () => {
		const result = await listClubsService();
		expect(repo.selectAll).toHaveBeenCalled();
		expect(result).toEqual([]);
	});
	test('addClubService correctly saves a club when required fields provided', async () => {
		await addClubService(mockFieldsTemplate);
		expect(repo.selectByName).toHaveBeenCalled();
		const stored = await repo.selectByName('Hello World');
		expect(stored.clubTLA).toBe('HLW');
	});
	test('addClubService throws when required fields missing', async () => {
		await expect(
			addClubService({ ...mockFieldsTemplate, clubName: undefined })
		).rejects.toThrow();
		await expect(
			addClubService({ ...mockFieldsTemplate, clubTLA: undefined })
		).rejects.toThrow();
		await expect(
			addClubService({ ...mockFieldsTemplate, clubCrestURL: undefined })
		).rejects.toThrow();
	});
	test('addClubService throws when already stored clubName', async () => {
		db.push({ clubName: 'STORED' });
		let wasError = false;
		try {
			await addClubService({ ...mockFieldsTemplate, clubName: 'STORED' });
			wasError = false;
		} catch (err) {
			wasError = true;
		}
		expect(wasError).toBeTruthy();
		try {
			await addClubService({
				...mockFieldsTemplate,
				clubName: 'NOT STORED YET',
			});
			wasError = false;
		} catch (err) {
			wasError = true;
		}
		expect(wasError).toBeFalsy();
		try {
			await addClubService({
				...mockFieldsTemplate,
				clubName: 'NOT STORED YET',
			});
			wasError = false;
		} catch (err) {
			wasError = true;
		}
		expect(wasError).toBeTruthy();
	});
	test('findClubService finds club by id', async () => {
		db.push({ clubId: 'foo' });
		const found = await findClubService('foo');
		expect(found).toEqual({ clubId: 'foo' });
	});
});
