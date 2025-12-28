import type { FromSchema } from "json-schema-to-ts";

import { authHeadersSchema, type AuthHeaders } from "../auth/schema.js";

const postBodySchema = {
	type: "object",
	properties: {
		title: { type: "string" },
		content: { type: "string" },
		authorId: { type: "number" },
	},
	required: ["title", "content", "authorId"],
} as const;

type PostBody = FromSchema<typeof postBodySchema>;

const postParamsSchema = {
	type: "object",
	properties: {
		id: { type: "number" },
	},
	required: ["id"],
} as const;

type PostParams = FromSchema<typeof postParamsSchema>;

export const getPostByIdSchema = {
	params: postParamsSchema,
};

export type GetPostById = { Params: PostParams };

export const createPostSchema = {
	headers: authHeadersSchema,
	body: postBodySchema,
};

export type CreatePost = { Headers: AuthHeaders; Body: PostBody };

export const updatePostSchema = {
	headers: authHeadersSchema,
	params: postParamsSchema,
	body: postBodySchema,
};

export type UpdatePost = {
	Headers: AuthHeaders;
	Params: PostParams;
	Body: PostBody;
};

export const deletePostSchema = {
	headers: authHeadersSchema,
	params: postParamsSchema,
};

export type DeletePost = { Headers: AuthHeaders; Params: PostParams };
