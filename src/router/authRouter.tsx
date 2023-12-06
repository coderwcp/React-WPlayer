import { AxiosCanceler } from "@/api/helper/axiosCancel";
import { getLoginStateApi } from "@/api/modules/login";
import { store } from "@/redux";
import { setShowBigPlayer } from "@/redux/modules/music/action";
import { setSiteTitle } from "@/redux/modules/site/action";
import { setUserData, setUserOtherData, userLogOut } from "@/redux/modules/user/action";
import { rootRouter } from "@/router";
import { searchRoute } from "@/utils";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const axiosCanceler = new AxiosCanceler();

/**
 * @description 路由守卫组件
 * */
const AuthRouter = (props: { children: JSX.Element }) => {
	const dispatch = useDispatch();
	const user = store.getState().user;
	const { playState } = store.getState().music;

	// 关闭播放器
	dispatch(setShowBigPlayer(false));
	// 开始进度条
	// if (typeof window.$loadingBar !== "undefined") window.$loadingBar.start();
	const { pathname } = useLocation();
	const route = searchRoute(pathname, rootRouter);

	const setSiteTitleFn = (val: string) => {
		const title = val
			? val === import.meta.env.VITE_SITE_TITLE
				? val
				: val + " - " + import.meta.env.VITE_SITE_TITLE
			: sessionStorage.getItem("siteTitle") ?? import.meta.env.VITE_SITE_TITLE;
		dispatch(setSiteTitle(title));

		sessionStorage.setItem("siteTitle", title);
		if (!playState) {
			window.document.title = title;
		}
	};

	// 设置网站 title
	useEffect(() => {
		setSiteTitleFn(route.meta?.title ?? "");
	});

	// * 在跳转路由之前，清除所有的请求
	axiosCanceler.removeAllPending();

	// * 判断是否需要登录(不需要登录直接放行)
	if (!route.meta?.needLogin) {
		if (!Object.keys(user.userOtherData).length) setUserOtherData(user.userLogin);
		// if (typeof window.$loadingBar !== "undefined") window.$loadingBar.done();
		return props.children;
	} else {
		// 需要登录，检查登录状态
		getLoginStateApi()
			.then((res: any) => {
				if (res.data?.profile && user.userLogin) {
					setUserData(res.data.profile);
					if (!Object.keys(user.userOtherData).length) {
						setUserOtherData(user.userLogin);
					}
					// if (typeof window.$loadingBar !== "undefined") window.$loadingBar.done();
					return props.children;
				} else {
					window.$message.error(localStorage.getItem("cookie") ? "登录过期，请重新登录" : "请登录账号后使用");
					userLogOut();
					// if (typeof window.$loadingBar !== "undefined") window.$loadingBar.done();
					return <Navigate to="/login" />;
				}
			})
			.catch(err => {
				window.$message.error("请求发生错误");
				console.error("请求发生错误" + err);
				// if (typeof window.$loadingBar !== "undefined") window.$loadingBar.done();
				return <Navigate to="/500" />;
			});
	}
};

export default AuthRouter;
