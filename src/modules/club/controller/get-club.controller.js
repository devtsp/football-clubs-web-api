module.exports = function makeGetClub(findClub) {
	return async function getClub(httpRequest) {
		const headers = {
			'Content-Type': 'application/json',
		};
		try {
			const club = await findClub(httpRequest.params.id);
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
	};
};
