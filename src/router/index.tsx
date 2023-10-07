import Login from "@/pages/login";
import { Navigate, useRoutes } from "react-router-dom";
import { RouteObject } from "./interface";
import NotFound from "@/components/NotFound/index";
import homeRouter from "./modules/home";

const resolvedModules = {
	homeRouter
};

export const routerArray: RouteObject[] = [];

// * 处理路由
Object.values(resolvedModules).forEach(item => {
	routerArray.push(...item);
});

export const rootRouter: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/login" />
	},
	{ path: "/login", element: <Login /> },
	...routerArray,
	{ path: "*", element: <NotFound /> }
];

const router = () => {
	const routes = useRoutes(rootRouter);
	return routes;
};

export default router;
