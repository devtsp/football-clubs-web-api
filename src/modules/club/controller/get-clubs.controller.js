module.exports = function makeGetClubs(listClubs) {
	return async function getClubs(httpRequest) {
		const headers = {
			'Content-Type': 'application/json',
		};
		try {
			const clubs = await listClubs();
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
};
