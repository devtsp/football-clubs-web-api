module.exports = function makePostClub(addClub) {
	return async function postClub(httpRequest) {
		try {
			const posted = await addClub(httpRequest.body);
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
	};
};
