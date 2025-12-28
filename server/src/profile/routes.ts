import type { FastifyPluginAsync } from "fastify";

import type { AuthHeaders } from "../auth/schema.js";
import {
	protectedProfileSchema,
	type ProfileParams,
	publicProfileSchema,
} from "./schema.js";

const profileRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.get<{ Headers: AuthHeaders }>(
		"/profile",
		{
			schema: protectedProfileSchema,
			onRequest: fastify.authenticate,
		},
		async (request, reply) => {
			const token = request.headers.authorization.split(" ")[1];
			const { id } = fastify.jwt.decode<{ id: number }>(token)!;

			const user = await fastify.prisma.user.findUnique({
				where: { id },
			});

			if (user === null) {
				reply.status(404);

				return;
			}

			return user;
		}
	);

	fastify.get<{ Params: ProfileParams }>(
		"/profile/:id",
		{ schema: publicProfileSchema },
		async (request, reply) => {
			const { id } = request.params;

			const user = await fastify.prisma.user.findUnique({
				where: { id },
			});

			if (user === null) {
				reply.status(404);

				return;
			}

			return user;
		}
	);
};

export default profileRoutes;
