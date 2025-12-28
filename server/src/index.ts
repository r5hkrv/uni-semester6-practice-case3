import app from "./app.js";

import authRoutes from "./auth/routes.js";
import profileRoutes from "./profile/routes.js";
import postRoutes from "./post/routes.js";

app.register(authRoutes, { prefix: "/api" });
app.register(profileRoutes, { prefix: "/api" });
app.register(postRoutes, { prefix: "/api" });

try {
	await app.listen({ port: 3000 });
} catch (error) {
	app.log.error(error);
	process.exitCode = 1;
}
