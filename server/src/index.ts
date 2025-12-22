import fastify from "fastify";

import auth from "./auth/index.js";

const app = fastify({ logger: true });

app.register(auth);

app.register((app) => {
	app.get("/", { onRequest: app.authenticate }, async (request, reply) => {
		reply.send("Authorized!");
	});
});

try {
	await app.listen({ port: 3000 });
} catch (error) {
	app.log.error(error);
	process.exitCode = 1;
}
