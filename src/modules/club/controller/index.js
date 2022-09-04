module.exports = class ClubController {
	constructor(clubService) {
		this.clubService = clubService;
	}

	getById = async httpRequest => {
		const headers = {
			'Content-Type': 'application/json',
		};
		try {
			const club = await this.clubService.findById(httpRequest.params.id);
			return {
				headers,
				statusCode: 200,
				body: club,
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
	};

	getAll = async httpRequest => {
		const headers = {
			'Content-Type': 'application/json',
		};
		try {
			const clubs = await this.clubService.index();
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
	};

	post = async httpRequest => {
		try {
			const posted = await this.clubService.add(httpRequest?.body);
			return {
				headers: {
					'Content-Type': 'application/json',
					'Last-Modified': new Date(posted?.updatedAt).toUTCString(),
				},
				statusCode: 201,
				body: posted,
			};
		} catch (err) {
			return {
				headers: {
					'Content-Type': 'application/json',
				},
				statusCode: 400,
				body: {
					error: err?.message,
				},
			};
		}
	};
};
