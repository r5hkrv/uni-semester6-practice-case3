import type { FastifyPluginAsync } from "fastify";

import {
	type GetPostById,
	getPostByIdSchema,
	type CreatePost,
	createPostSchema,
	type UpdatePost,
	updatePostSchema,
	type DeletePost,
	deletePostSchema,
} from "./schema.js";

const postRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.get("/posts", async (request, reply) => {
		return await fastify.prisma.post.findMany();
	});

	fastify.get<GetPostById>(
		"/posts/:id",
		{ schema: getPostByIdSchema, attachValidation: true },
		async (request, reply) => {
			if (request.validationError) {
				reply.status(400).send(request.validationError);

				return;
			}
			const { id } = request.params;

			const post = await fastify.prisma.post.findUnique({
				where: { id },
			});

			if (post === null) {
				reply.status(404);

				return;
			}

			return post;
		}
	);

	fastify.post<CreatePost>(
		"/posts",
		{
			schema: createPostSchema,
			attachValidation: true,
			onRequest: fastify.authenticate,
		},
		async (request, reply) => {
			if (request.validationError) {
				reply.status(400).send(request.validationError);

				return;
			}

			return await fastify.prisma.post.create({
				data: request.body,
			});
		}
	);

	fastify.put<UpdatePost>(
		"/posts/:id",
		{
			schema: updatePostSchema,
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

			const post = await fastify.prisma.post.findUnique({
				where: { id },
			});

			if (post === null) {
				reply.status(404);

				return;
			}

			return await fastify.prisma.post.update({
				where: { id },
				data: request.body,
			});
		}
	);

	fastify.delete<DeletePost>(
		"/posts/:id",
		{
			schema: deletePostSchema,
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

			const post = await fastify.prisma.post.findUnique({
				where: { id },
			});

			if (post === null) {
				reply.status(404);

				return;
			}

			return await fastify.prisma.post.delete({
				where: { id },
			});
		}
	);
};

export default postRoutes;
