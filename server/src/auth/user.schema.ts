export const userSchema = {
	type: "object",
	properties: {
		name: { type: "string" },
		password: { type: "string" },
	},
	required: ["name", "password"],
} as const;

type Schema<
	T extends {
		properties: { [x: PropertyKey]: { type: string } };
	},
	P extends T["properties"] = T["properties"]
> = {
	[K in keyof P]: P[K]["type"] extends "string"
		? string
		: P[K]["type"] extends "number"
		? number
		: P[K]["type"] extends "boolean"
		? boolean
		: unknown;
};

export type UserSchema = Schema<typeof userSchema>;
