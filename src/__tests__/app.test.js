const request = require('supertest');

const makeExpressApp = require('../express');
const ClubController = require('../modules/club/controller/ClubController');
const ClubService = require('../modules/club/service/ClubService');

const mockClub = {
	clubName: 'Hello World',
	clubTLA: 'HLW',
	clubCrestURL: 'http://asdasd.com',
};

let db = [];
const clubRepoMock = {
	insert: jest.fn(body => {
		db.push(body);
		return db.find(({ clubName }) => clubName == body.clubName);
	}),
	selectAll: jest.fn(() => db),
	selectById: jest.fn(id => db.find(({ clubId }) => clubId == id)),
	selectByName: jest.fn(name => db.find(({ clubName }) => clubName == name)),
};

// BUILD CLUB CONTROLLER WITH MOCKED REPO
const clubService = new ClubService(clubRepoMock);
const clubController = new ClubController(clubService);

// APP
const app = makeExpressApp({ clubController });

describe('GET /clubs', () => {
	test('returns empty array when no entries in db', async () => {
		const response = await request(app).get('/clubs');

		expect(response.body).toEqual([]);
	});

	test('returns array of clubs when entries in db', async () => {
		db.push({ ...mockClub });

		const response = await request(app).get('/clubs');

		expect(response.body.length).toBe(1);
	});
});
