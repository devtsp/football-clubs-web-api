const makeClubControllers = require('../index');

const mockService = {
	findClubService: jest.fn(async id => {}),
	listClubsService: jest.fn(async () => []),
	addClubService: jest.fn(async clubBody => clubBody),
};

const mockReqBody = {
	clubName: 'Hello World',
	clubTLA: 'HLW',
	clubCrestURL: 'http://asdasd.com',
};

const { getAllClubsController, getClubController, postClubController } =
	makeClubControllers(mockService);

describe('postClubController', () => {
	const { addClubService } = mockService;
	test('201 on service success', async () => {
		const response = await postClubController({ body: mockReqBody });

		expect(addClubService).toHaveBeenCalledWith(mockReqBody);
		expect(response.headers['Content-Type']).toEqual('application/json');
		expect(response.statusCode).toBe(201);
		expect(response.body).toEqual(mockReqBody);
	});
	test('400 on service error', async () => {
		let response;
		addClubService.mockRejectedValueOnce(new Error());

		try {
			response = await postClubController();
		} catch (err) {
			response = err;
		}

		expect(addClubService).toHaveBeenCalledWith(mockReqBody);
		expect(response.headers['Content-Type']).toEqual('application/json');
		expect(response.statusCode).toBe(400);
		expect(response.body.error).toBeDefined();
	});
});

describe('getClubController', () => {
	const { findClubService } = mockService;
	test('200 on service success', async () => {
		findClubService.mockImplementationOnce(id => id);

		const response = await getClubController({ params: { id: '1' } });

		expect(findClubService).toHaveBeenCalledWith('1');
		expect(response.headers['Content-Type']).toEqual('application/json');
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual('1');
	});
	test('400 on service error', async () => {
		let response;
		findClubService.mockRejectedValueOnce(new Error());

		try {
			response = await getClubController({ params: { id: '1' } });
		} catch (err) {
			response = err;
		}

		expect(findClubService).toHaveBeenCalled();
		expect(response.headers['Content-Type']).toEqual('application/json');
		expect(response.statusCode).toBe(400);
		expect(response.body.error).toBeDefined();
	});
});

describe('getAllClubsController', () => {
	const { listClubsService } = mockService;
	test('200 on service success', async () => {
		listClubsService.mockResolvedValueOnce('[mock clubs list]');

		const response = await getAllClubsController();

		expect(listClubsService).toHaveBeenCalled();
		expect(response.headers['Content-Type']).toEqual('application/json');
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual('[mock clubs list]');
	});
	test('400 on service error', async () => {
		let response;
		listClubsService.mockRejectedValueOnce(new Error());

		try {
			response = await getAllClubsController();
		} catch (err) {
			response = err;
		}

		expect(listClubsService).toHaveBeenCalled();
		expect(response.headers['Content-Type']).toEqual('application/json');
		expect(response.statusCode).toBe(400);
		expect(response.body.error).toBeDefined();
	});
});
