const ClubService = require('../ClubService');
const {
	ClubAlreadyExistsError,
	ClubMissingRequiredFieldsError,
	ClubIdUndefinedError,
} = require('../errors');

// MOCK CLUB REPO
let db = [];
const clubRepositoryMock = {
	insert: jest.fn(async body => {
		db.push(body);
		return db.find(({ clubName }) => clubName == body.clubName);
	}),
	selectAll: jest.fn(async () => db),
	selectById: jest.fn(async id => db.find(({ clubId }) => clubId == id)),
	selectByName: jest.fn(async name =>
		db.find(({ clubName }) => clubName == name)
	),
};
const mockFieldsTemplate = {
	clubName: 'Hello World',
	clubTLA: 'HLW',
	clubCrestURL: 'http://asdasd.com',
};

// INSTANTIATE SERVICE WITH MOCKED REPO
const clubService = new ClubService(clubRepositoryMock);

// TESTS SETUP
afterEach(() => {
	jest.clearAllMocks();
	db = [];
});

describe('clubService.index()', () => {
	test('calls clubRepo.selectAll() ', async () => {
		await clubService.index();

		expect(clubRepositoryMock.selectAll).toHaveBeenCalled();
	});
});

describe('clubService.add()', () => {
	test('throws ClubMissingRequiredFieldsError if no club data passed or incorrect', async () => {
		let error;
		try {
			await clubService.add();
		} catch (err) {
			error = err;
		}

		expect(error).toBeInstanceOf(ClubMissingRequiredFieldsError);
		expect(clubRepositoryMock.selectByName).not.toHaveBeenCalled();
		expect(clubRepositoryMock.insert).not.toHaveBeenCalled();

		try {
			await clubService.add({ ...mockFieldsTemplate, clubName: undefined });
		} catch (err) {
			error = err;
		}

		expect(error).toBeInstanceOf(ClubMissingRequiredFieldsError);
		expect(clubRepositoryMock.selectByName).not.toHaveBeenCalled();
		expect(clubRepositoryMock.insert).not.toHaveBeenCalled();
	});

	test('calls clubRepo.selectByName() to check if duplicate and clubRepo.insert() afterwards if not', async () => {
		await clubService.add(mockFieldsTemplate);

		expect(clubRepositoryMock.selectByName).toHaveBeenCalledWith(
			mockFieldsTemplate.clubName
		);
		expect(clubRepositoryMock.insert).toHaveBeenCalled();
	});

	test('throws ClubAlreadyExistsError if club name already taken', async () => {
		db.push(mockFieldsTemplate);
		let error;

		try {
			await clubService.add(mockFieldsTemplate);
		} catch (err) {
			error = err;
		}

		expect(clubRepositoryMock.selectByName).toHaveBeenCalledWith(
			mockFieldsTemplate.clubName
		);
		expect(error).toBeInstanceOf(ClubAlreadyExistsError);
		expect(clubRepositoryMock.insert).not.toHaveBeenCalled();
	});
});

describe('clubService.findClubService()', () => {
	test('calls clubRepo.selectById() if id passed', async () => {
		await clubService.findById('foo');

		expect(clubRepositoryMock.selectById).toHaveBeenCalledWith('foo');
	});

	test('throws ClubIdUndefinedError if id not passed', async () => {
		let error;
		try {
			await clubService.findById();
		} catch (err) {
			error = err;
		}

		expect(error).toBeInstanceOf(ClubIdUndefinedError);
		expect(clubRepositoryMock.selectById).not.toHaveBeenCalled();
	});
});
