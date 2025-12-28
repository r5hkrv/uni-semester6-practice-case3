import type { FromSchema } from "json-schema-to-ts";

import { authHeadersSchema, type AuthHeaders } from "../auth/schema.js";

const profileParamsSchema = {
	type: "object",
	properties: {
		id: { type: "number" },
	},
	required: ["id"],
} as const;

export type ProfileParams = FromSchema<typeof profileParamsSchema>;

export const getProtectedProfileSchema = {
	headers: authHeadersSchema,
};

export type GetProtectedProfile = {
	Headers: AuthHeaders;
};

export const getPublicProfileSchema = {
	params: profileParamsSchema,
};

export type GetPublicProfile = { Params: ProfileParams };

export const getProfilePostsSchema = {
	params: profileParamsSchema,
};

export type GetProfilePosts = { Params: ProfileParams };
