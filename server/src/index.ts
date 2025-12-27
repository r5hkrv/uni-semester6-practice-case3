import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import vueRouterFallback from "./plugins/vueRouterFallback.js";
import path from "node:path";

import auth from "./auth/index.js";

const configureOrigin: fastifyCors.OriginFunction = (origin, cb) => {
	if (origin !== undefined) {
		const hostname = new URL(origin).hostname;

		if (hostname === "localhost") {
			cb(null, true);

			return;
		}
	}
	cb(null, false);
};

const app = fastify({ logger: true });

app.register(fastifyCors, { origin: configureOrigin });

app.register(vueRouterFallback, {
	clientBuildDir: path.resolve(import.meta.dirname, "../../client/dist"),
});

app.register(auth);

try {
	await app.listen({ port: 3000 });
} catch (error) {
	app.log.error(error);
	process.exitCode = 1;
}
