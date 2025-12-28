import "dotenv/config";
import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import path from "node:path";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

import vueRouterFallback from "./plugins/vueRouterFallback.js";
import prismaPlugin from "./plugins/prisma.js";
import authPlugin from "./auth/plugin.js";

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

app.register(prismaPlugin, {
	adapter: new PrismaBetterSqlite3({ url: `${process.env.DATABASE_URL}` }),
});

app.register(authPlugin, { tokenExpiresIn: "15m" });

export default app;
