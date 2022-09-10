const ClubController = require('../ClubController');

const clubServiceMock = {
	findById: jest.fn(async id => {}),
	index: jest.fn(async () => []),
	add: jest.fn(async clubBody => clubBody),
};

const mockReqBody = {
	clubName: 'Hello World',
	clubTLA: 'HLW',
	clubCrestURL: 'http://asdasd.com',
};

const clubController = new ClubController(clubServiceMock);

describe('clubController.post()', () => {
	test('201 on service success', async () => {
		const response = await clubController.post({ body: mockReqBody });

		expect(clubServiceMock.add).toHaveBeenCalledWith(mockReqBody);
		expect(response.headers['Content-Type']).toEqual('application/json');
		expect(response.statusCode).toBe(201);
		expect(response.body).toEqual(mockReqBody);
	});

	test('400 on service error', async () => {
		let response;
		clubServiceMock.add.mockRejectedValueOnce(new Error());

		try {
			response = await clubController.post();
		} catch (err) {
			response = err;
		}

		expect(clubServiceMock.add).toHaveBeenCalledWith(mockReqBody);
		expect(response.headers['Content-Type']).toEqual('application/json');
		expect(response.statusCode).toBe(400);
		expect(response.body.error).toBeDefined();
	});
});

describe('clubController.getById()', () => {
	test('200 on service success', async () => {
		clubServiceMock.findById.mockImplementationOnce(id => id);

		const response = await clubController.getById({ params: { id: '1' } });

		expect(clubServiceMock.findById).toHaveBeenCalledWith('1');
		expect(response.headers['Content-Type']).toEqual('application/json');
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual('1');
	});
	test('400 on service error', async () => {
		let response;
		clubServiceMock.findById.mockRejectedValueOnce(new Error());

		try {
			response = await clubController.getById({ params: { id: '1' } });
		} catch (err) {
			response = err;
		}

		expect(clubServiceMock.findById).toHaveBeenCalled();
		expect(response.headers['Content-Type']).toEqual('application/json');
		expect(response.statusCode).toBe(400);
		expect(response.body.error).toBeDefined();
	});
});

describe('clubController.getAll()', () => {
	test('200 on service success', async () => {
		clubServiceMock.index.mockResolvedValueOnce('[mock clubs list]');

		const response = await clubController.getAll();

		expect(clubServiceMock.index).toHaveBeenCalled();
		expect(response.headers['Content-Type']).toEqual('application/json');
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual('[mock clubs list]');
	});

	test('400 on service error', async () => {
		let response;
		clubServiceMock.index.mockRejectedValueOnce(new Error());

		try {
			response = await clubController.getAll();
		} catch (err) {
			response = err;
		}

		expect(clubServiceMock.index).toHaveBeenCalled();
		expect(response.headers['Content-Type']).toEqual('application/json');
		expect(response.statusCode).toBe(400);
		expect(response.body.error).toBeDefined();
	});
});
