import { PrismaClient } from "../../generated/prisma/client.js";
import type { SqlDriverAdapterFactory } from "@prisma/client/runtime/client";
import fp from "fastify-plugin";

declare module "fastify" {
	interface FastifyInstance {
		prisma: PrismaClient;
	}
}

type Options = {
	adapter: SqlDriverAdapterFactory;
};

const prismaPlugin = fp<Options>(async (fastify, options) => {
	const client = new PrismaClient({ adapter: options.adapter });

	fastify.decorate("prisma", client);
});

export default prismaPlugin;
