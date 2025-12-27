import { shallowRef, ref } from "vue";

type User = {
	email: string;
};

export type AuthPath = "/signup" | "/signin";

export type UserCredentials = {
	email: string;
	password: string;
};

const token = ref<string | null>(null);
const user = shallowRef<User | null>(null);

const useAuthStore = () => {
	const fetchToken = async (path: AuthPath, credentials: UserCredentials) => {
		const reply = await fetch(`http://localhost:3000${path}`, {
			method: "post",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(credentials),
		});

		if (!reply.ok) return false;

		token.value = await reply.text();

		return true;
	};

	const fetchProfile = async () => {
		if (token.value === null) return false;

		const reply = await fetch("http://localhost:3000/profile", {
			headers: { authorization: `Bearer ${token.value}` },
		});

		if (!reply.ok) return false;

		user.value = await reply.json();

		return true;
	};

	return {
		token,
		user,
		fetchToken,
		fetchProfile,
	};
};

export default useAuthStore;
