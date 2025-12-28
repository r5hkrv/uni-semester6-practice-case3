import type { onRequestAsyncHookHandler } from "fastify";
import fastifyJwt from "@fastify/jwt";
import fp from "fastify-plugin";

declare module "fastify" {
	interface FastifyInstance {
		authenticate: onRequestAsyncHookHandler;
	}
}

interface Options {
	tokenExpiresIn: string | number;
}

const authPlugin = fp<Options>(async (fastify, options) => {
	fastify.register(fastifyJwt, {
		secret: "temporary",
		sign: { expiresIn: options.tokenExpiresIn },
	});

	fastify.decorate("authenticate", async (request, reply) => {
		try {
			await request.jwtVerify();
		} catch (error) {
			reply.send(error);
		}
	});
});

export default authPlugin;
