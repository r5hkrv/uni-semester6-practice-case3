import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";
import fs from "fs/promises";
import path from "path";

const getContentType = (extname: string) => {
	switch (extname) {
		case ".html":
			return "text/html; charset=utf-8";
		case ".css":
			return "text/css; charset=utf-8";
		case ".js":
			return "text/javascript; charset=utf-8";
		default:
			return "text/plain; charset=utf-8";
	}
};

const getBuildArtifact = async (buildDir: string, filepath: string) => {
	filepath = path.resolve(buildDir, filepath);

	const ext = path.extname(filepath);

	if (ext === "") {
		const stat = await fs.stat(filepath);

		if (stat.isDirectory()) return null;
	}
	const data = await fs.readFile(filepath, "utf-8");
	const type = getContentType(ext);

	return { data, type };
};

interface VueRouterFallbackOptions {
	clientBuildDir: string;
}

type VueRouterFallbackPlugin = FastifyPluginAsync<VueRouterFallbackOptions>;

const vueRouterFallback: VueRouterFallbackPlugin = async (
	fastify,
	{ clientBuildDir }
) => {
	fastify.get("/*", async (request, reply) => {
		const artifact = await getBuildArtifact(clientBuildDir, "index.html");

		if (artifact === null) {
			reply.status(404);

			return;
		}

		reply.type(artifact.type).send(artifact.data);
	});

	fastify.get("/assets/*", async (request, reply) => {
		try {
			const filepath = request.url.substring(1);
			const artifact = await getBuildArtifact(clientBuildDir, filepath);

			if (artifact === null) {
				reply.status(403);

				return;
			}

			reply.type(artifact.type).send(artifact.data);
		} catch (error) {
			reply.status(404);
		}
	});
};

export default fp(vueRouterFallback);
