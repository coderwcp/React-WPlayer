import { Navigate, useRoutes } from "react-router-dom";
import { RouteObject } from "./interface";
import NotFound from "@/components/NotFound/index";
import Home from "@/pages/home";
import searchRouter from "./modules/search";
import settingRouter from "./modules/setting";
import Login from "@/pages/login";

const resolvedModules = {
	searchRouter,
	settingRouter
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
		element: <Home />,
		meta: {
			title: "首页"
		}
	},
	{
		path: "/login",
		element: <Login />,
		meta: {
			title: "登录"
		}
	},
	...routerArray,
	{ path: "*", element: <NotFound /> }
];

const router = () => {
	const routes = useRoutes(rootRouter);
	return routes;
};

export default router;
