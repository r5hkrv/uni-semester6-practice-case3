import type { FromSchema } from "json-schema-to-ts";

import { authHeadersSchema } from "../auth/schema.js";

const profileParamsSchema = {
	type: "object",
	properties: {
		id: { type: "number" },
	},
} as const;

export type ProfileParams = FromSchema<typeof profileParamsSchema>;

const profileResponseSchema = {
	200: {
		type: "object",
		properties: {
			id: { type: "number" },
			email: { type: "string" },
			pwhash: { type: "string" },
		},
	},
};

export const protectedProfileSchema = {
	headers: authHeadersSchema,
	response: profileResponseSchema,
};

export const publicProfileSchema = {
	params: profileParamsSchema,
	response: profileResponseSchema,
};
