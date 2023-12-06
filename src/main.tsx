import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/style/global.scss";
import "@/style/customAntDesign.scss";
import "@/locales/index.ts";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/index";
import { PersistGate } from "redux-persist/integration/react";
import NProgress from "@/api/helper/NProgress.ts";
import { message } from "antd";

// 全局对象
window.$loadingBar = NProgress;

ReactDOM.createRoot(document.getElementById("root")!).render(
	// <StrictMode>
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<App />
		</PersistGate>
	</Provider>
	// </StrictMode>
);

if ("serviceWorker" in navigator) {
	let pwaMessage: boolean = false;
	const key = "onupdatefound";

	// 检测到更新提醒
	navigator.serviceWorker.addEventListener("onupdatefound", () => {
		console.info("发现站点更新，正在下载新版本");
		pwaMessage = !!message.open({
			key,
			type: "loading",
			content: "发现站点更新，正在下载新版本",
			duration: 0
		});
	});

	// 更新完成提醒
	navigator.serviceWorker.addEventListener("controllerchange", () => {
		console.info("站点已更新，刷新后生效");
		if (pwaMessage) message.destroy(key);
		message.info("站点已更新，刷新后生效", 0);
	});
}
