const makeClubsService = require('../index');

const repo = {
	insert: jest.fn(),
	selectAll: jest.fn(),
	selectById: jest.fn(),
	selectByName: jest.fn(),
};

const { findClubService, listClubsService, addClubService } =
	makeClubsService(repo);

const mockFieldsTemplate = {
	clubName: 'Hello World',
	clubTLA: 'HLW',
	clubCrestURL: 'http://asdasd.com',
};

describe('services.findClubService()', () => {
	test('calls repository.insert() ', async () => {
		await listClubsService();

		expect(repo.selectAll).toHaveBeenCalled();
	});
});

describe('services.addClubsService()', () => {
	test('calls repository.selectByName() and repository.insert()', async () => {
		await addClubService(mockFieldsTemplate);

		expect(repo.selectByName).toHaveBeenCalledWith(mockFieldsTemplate.clubName);
		expect(repo.insert).toHaveBeenCalled();
	});
});

describe('services.findClubService()', () => {
	test('calls repository.selectById() ', async () => {
		await findClubService('foo');

		expect(repo.selectById).toHaveBeenCalledWith('foo');
	});
});
