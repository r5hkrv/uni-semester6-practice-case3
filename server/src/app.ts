import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import vueRouterFallback from "./plugins/vueRouterFallback.js";
import path from "node:path";

const app = fastify({ logger: true });

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

app.register(fastifyCors, { origin: configureOrigin });

app.register(vueRouterFallback, {
	clientBuildDir: path.resolve(import.meta.dirname, "../../client/dist"),
});

export default app;
