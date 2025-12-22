import bcrypt from "bcryptjs";

import type { UserSchema } from "./user.schema.js";

type User = {
	name: string;
	pwhash: string;
};

const users: Record<string, User> = {};

export const createUser = async (user: UserSchema) => {
	if (user.name in users) return { statusCode: 400 };

	const pwhash = await bcrypt.hash(user.password, 10);

	users[user.name] = { name: user.name, pwhash };

	return { statusCode: 200 };
};

export const verifyUser = async (user: UserSchema) => {
	if (!(user.name in users)) return { statusCode: 404 };

	const equals = await bcrypt.compare(user.password, users[user.name].pwhash);

	if (!equals) return { statusCode: 401 };

	return { statusCode: 200 };
};
