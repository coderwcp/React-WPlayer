import { Navigate, useRoutes } from "react-router-dom";
import { RouteObject } from "./interface";
import NotFound from "@/components/NotFound/index";
import Home from "@/pages/home";
import searchRouter from "./modules/search";

const resolvedModules = {
	searchRouter
};

export const routerArray: RouteObject[] = [];

// * 处理路由
Object.values(resolvedModules).forEach(item => {
	routerArray.push(...item);
});

export const rootRouter: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/home" />
	},
	{
		path: "/home",
		element: <Home />
	},
	...routerArray,
	{ path: "*", element: <NotFound /> }
];

const router = () => {
	const routes = useRoutes(rootRouter);
	return routes;
};

export default router;
