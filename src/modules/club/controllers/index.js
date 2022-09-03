module.exports = function makeClubControllers(clubService) {
	async function getClubController(httpRequest) {
		const headers = {
			'Content-Type': 'application/json',
		};
		try {
			const club = await clubService.findClubService(httpRequest.params.id);
			return {
				headers,
				statusCode: club,
			};
		} catch (err) {
			return {
				headers,
				statusCode: 400,
				body: {
					error: err.message,
				},
			};
		}
	}

	async function getAllClubsController(httpRequest) {
		const headers = {
			'Content-Type': 'application/json',
		};
		try {
			const clubs = await clubService.listClubsService();
			return {
				headers,
				statusCode: 200,
				body: clubs,
			};
		} catch (err) {
			return {
				headers,
				statusCode: 400,
				body: {
					error: err.message,
				},
			};
		}
	}

	async function postClubController(httpRequest) {
		try {
			const posted = await clubService.addClubService(httpRequest.body);
			return {
				headers: {
					'Content-Type': 'application/json',
					'Last-Modified': new Date(posted.modifiedAt).toUTCString(),
				},
				statusCode: 201,
				body: { posted },
			};
		} catch (err) {
			console.log(err);
			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 400,
				body: {
					error: err.message,
				},
			};
		}
	}

	return Object.freeze({
		postClubController,
		getClubController,
		getAllClubsController,
	});
};
