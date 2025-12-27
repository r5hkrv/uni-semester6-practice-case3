import app from "./app.js";

import auth from "./auth/index.js";

app.register(auth);

try {
	await app.listen({ port: 3000 });
} catch (error) {
	app.log.error(error);
	process.exitCode = 1;
}
