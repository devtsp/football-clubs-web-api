const request = require('supertest');

const initClubsModule = require('../modules/club');
const makeExpressApp = require('../express');

const db = [];

const mockClub = {
	clubName: 'Hello World',
	clubTLA: 'HLW',
	clubCrestURL: 'http://asdasd.com',
};

const clubMockRepository = {
	insert: jest.fn(body => {
		db.push(body);
		return db.find(({ clubName }) => clubName == body.clubName);
	}),
	selectAll: jest.fn(() => db),
	selectById: jest.fn(id => db.find(({ clubId }) => clubId == id)),
	selectByName: jest.fn(name => db.find(({ clubName }) => clubName == name)),
};

const clubControllers = initClubsModule(clubMockRepository);
const app = makeExpressApp({ clubControllers });
const server = app.listen(5500);

describe('GET /clubs', () => {
	test('empty array when no entries in db', async () => {
		const { body } = await request(app).get('/clubs');

		expect(body).toEqual([]);
	});

	test('array of clubs when entries in db', async () => {
		db.push({ ...mockClub });
		const { body } = await request(app).get('/clubs');

		expect(body.length).toBe(1);
	});
});

server.close();
