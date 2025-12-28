import type { FromSchema } from "json-schema-to-ts";

const authBodySchema = {
	type: "object",
	properties: {
		email: { type: "string" },
		password: { type: "string" },
	},
	required: ["email", "password"],
} as const;

export type AuthBody = FromSchema<typeof authBodySchema>;

export const authHeadersSchema = {
	type: "object",
	properties: {
		authorization: { type: "string" },
	},
	required: ["authorization"],
} as const;

export type AuthHeaders = FromSchema<typeof authHeadersSchema>;

export const authSchema = {
	body: authBodySchema,
	response: {
		200: {
			type: "object",
			properties: {
				id: { type: "number" },
			},
		},
	},
};
