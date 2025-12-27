import type { FastifyPluginAsync } from "fastify";
import bcrypt from "bcryptjs";

import { type UserBodySchema, userSchema } from "./user.schema.js";

const authRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.post<{ Body: UserBodySchema }>(
		"/signup",
		{ schema: userSchema, attachValidation: true },
		async (request, reply) => {
			if (request.validationError !== undefined) {
				return reply.status(400).send(request.validationError);
			}
			const { email, password } = request.body;

			let user = await fastify.prisma.user.findUnique({
				where: { email },
			});

			if (user !== null) {
				reply.status(400);

				return;
			}

			const pwhash = await bcrypt.hash(password, 10);

			user = await fastify.prisma.user.create({
				data: { email, pwhash },
			});

			return await reply.jwtSign({ id: user.id });
		}
	);

	fastify.post<{ Body: UserBodySchema }>(
		"/signin",
		{ schema: userSchema, attachValidation: true },
		async (request, reply) => {
			if (request.validationError !== undefined) {
				return reply.status(400).send(request.validationError);
			}
			const { email, password } = request.body;

			const user = await fastify.prisma.user.findUnique({
				where: { email },
			});

			if (user === null) {
				reply.status(400);

				return;
			}

			const isPasswordOk = await bcrypt.compare(password, user.pwhash);

			if (!isPasswordOk) return reply.status(401);

			return await reply.jwtSign({ id: user.id });
		}
	);
};

export default authRoutes;
