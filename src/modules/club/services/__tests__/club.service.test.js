const makeClubsService = require('../index');
const {
	ClubAlreadyExistsError,
	ClubMissingRequiredFieldsError,
	ClubIdUndefinedError,
} = require('../errors');

// MOCK CLUB REPO
let db = [];
const clubMockRepository = {
	insert: jest.fn(body => {
		db.push(body);
		return db.find(({ clubName }) => clubName == body.clubName);
	}),
	selectAll: jest.fn(() => db),
	selectById: jest.fn(id => db.find(({ clubId }) => clubId == id)),
	selectByName: jest.fn(name => db.find(({ clubName }) => clubName == name)),
};
const mockFieldsTemplate = {
	clubName: 'Hello World',
	clubTLA: 'HLW',
	clubCrestURL: 'http://asdasd.com',
};

// INSTANTIATE SERVICE WITH MOCKED REPO
const { findClubService, listClubsService, addClubService } =
	makeClubsService(clubMockRepository);

// TESTS SETUP
afterEach(() => {
	jest.clearAllMocks();
	db = [];
});

describe('services.listClubService()', () => {
	test('calls repository.selectAll() ', async () => {
		await listClubsService();

		expect(clubMockRepository.selectAll).toHaveBeenCalled();
	});
});

describe('services.addClubService()', () => {
	test('throws ClubMissingRequiredFieldsError if no club data passed or incorrect', async () => {
		let error;
		try {
			await addClubService();
		} catch (err) {
			error = err;
		}

		expect(error).toBeInstanceOf(ClubMissingRequiredFieldsError);
		expect(clubMockRepository.selectByName).not.toHaveBeenCalled();
		expect(clubMockRepository.insert).not.toHaveBeenCalled();

		try {
			await addClubService({ ...mockFieldsTemplate, clubName: undefined });
		} catch (err) {
			error = err;
		}

		expect(error).toBeInstanceOf(ClubMissingRequiredFieldsError);
		expect(clubMockRepository.selectByName).not.toHaveBeenCalled();
		expect(clubMockRepository.insert).not.toHaveBeenCalled();
	});

	test('calls repository.selectByName() to check if duplicate and repository.insert() afterwards if not', async () => {
		await addClubService(mockFieldsTemplate);

		expect(clubMockRepository.selectByName).toHaveBeenCalledWith(
			mockFieldsTemplate.clubName
		);
		expect(clubMockRepository.insert).toHaveBeenCalled();
	});

	test('throws ClubAlreadyExistsError if club name already taken', async () => {
		db.push(mockFieldsTemplate);
		let error;

		try {
			await addClubService(mockFieldsTemplate);
		} catch (err) {
			error = err;
		}

		expect(clubMockRepository.selectByName).toHaveBeenCalledWith(
			mockFieldsTemplate.clubName
		);
		expect(error).toBeInstanceOf(ClubAlreadyExistsError);
		expect(clubMockRepository.insert).not.toHaveBeenCalled();
	});
});

describe('services.findClubService()', () => {
	test('calls repository.selectById() if id passed', async () => {
		await findClubService('foo');

		expect(clubMockRepository.selectById).toHaveBeenCalledWith('foo');
	});

	test('throws ClubIdUndefinedError if id not passed', async () => {
		let error;
		try {
			await findClubService();
		} catch (err) {
			error = err;
		}

		expect(error).toBeInstanceOf(ClubIdUndefinedError);
		expect(clubMockRepository.selectById).not.toHaveBeenCalled();
	});
});
