import { AxiosCanceler } from "@/api/helper/axiosCancel";
import { rootRouter } from "@/router";
import { searchRoute } from "@/utils";
import { Navigate, useLocation } from "react-router-dom";
import { store } from "../store";

const axiosCanceler = new AxiosCanceler();

/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props: { children: JSX.Element }) => {
	const { pathname } = useLocation();
	const route = searchRoute(pathname, rootRouter);

	// * 在跳转路由之前，清除所有的请求
	axiosCanceler.removeAllPending();

	// * 判断当前路由是否需要访问权限(不需要权限直接放行)
	if (!route.meta?.requiresAuth) return props.children;

	// * 判断是否有Token
	const token = store.getState().user.userLogin;
	if (!token) return <Navigate to="/login" replace />;

	// * 当前账号有权限返回 Router，正常访问页面
	return props.children;
};

export default AuthRouter;
