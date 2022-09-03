const makeClubControllers = require('../index');

const mockService = {
	findClubService: jest.fn(async id => {}),
	listClubsService: jest.fn(async () => {}),
	addClubService: jest.fn(async clubInfo => ({ mockedServiceResponse: true })),
};

const mockFieldsTemplate = {
	clubName: 'Hello World',
	clubTLA: 'HLW',
	clubCrestURL: 'http://asdasd.com',
};

const { getAllClubsController, getClubController, postClubController } =
	makeClubControllers(mockService);

describe('postClubController', () => {
	test('calls addClubService', async () => {
		const result = await postClubController({ body: mockFieldsTemplate });
		expect(mockService.addClubService).toHaveBeenCalledWith(mockFieldsTemplate);
		expect(result.statusCode).toBe(201);
		expect(result.body).toEqual({ mockedServiceResponse: true });
	});
});
