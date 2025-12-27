import { createRouter, createWebHistory } from "vue-router";

import HomeView from "./views/HomeView.vue";
import SignUpView from "./views/SignUpView.vue";
import SignInView from "./views/SignInView.vue";
import NotFoundView from "./views/NotFoundView.vue";

const routes = [
	{ path: "/", component: HomeView },
	{ path: "/signup", component: SignUpView },
	{ path: "/signin", component: SignInView },
	{ path: "/:pathMatch(.*)", component: NotFoundView },
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
