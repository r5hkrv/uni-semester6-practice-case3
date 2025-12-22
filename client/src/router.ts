import { createMemoryHistory, createRouter } from "vue-router";

import HomeView from "./views/HomeView.vue";
import SignUpView from "./views/SignUpView.vue";
import SignInView from "./views/SignInView.vue";

const routes = [
	{ path: "/", component: HomeView },
	{ path: "/signup", component: SignUpView },
	{ path: "/signin", component: SignInView },
];

export const router = createRouter({
	history: createMemoryHistory(),
	routes,
});
