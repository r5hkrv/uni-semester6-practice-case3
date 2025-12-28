import type { FastifyPluginAsync } from "fastify";

import {
	type GetProtectedProfile,
	getProtectedProfileSchema,
	type GetPublicProfile,
	getPublicProfileSchema,
	type GetProfilePosts,
	getProfilePostsSchema,
} from "./schema.js";

const profileRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.get<GetProtectedProfile>(
		"/profile",
		{
			schema: getProtectedProfileSchema,
			attachValidation: true,
			onRequest: fastify.authenticate,
		},
		async (request, reply) => {
			if (request.validationError) {
				reply.status(400).send(request.validationError);

				return;
			}
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

	fastify.get<GetPublicProfile>(
		"/profile/:id",
		{ schema: getPublicProfileSchema, attachValidation: true },
		async (request, reply) => {
			if (request.validationError) {
				reply.status(400).send(request.validationError);

				return;
			}
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

	fastify.get<GetProfilePosts>(
		"/profile/:id/posts",
		{ schema: getProfilePostsSchema, attachValidation: true },
		async (request, reply) => {
			if (request.validationError) {
				reply.status(400).send(request.validationError);

				return;
			}
			const { id } = request.params;

			const user = await fastify.prisma.user.findUnique({
				where: { id },
			});

			if (user === null) {
				reply.status(404);

				return;
			}

			return await fastify.prisma.post.findMany({
				where: { authorId: id },
			});
		}
	);
};

export default profileRoutes;
