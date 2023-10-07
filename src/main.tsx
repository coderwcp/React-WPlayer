import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style/global.scss";
import "@/locales/index.ts";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/index";
import { PersistGate } from "redux-persist/integration/react";
import NProgress from "./api/helper/NProgress.ts";

// 全局对象
window.$loadingBar = NProgress;

ReactDOM.createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</PersistGate>
		</Provider>
	</StrictMode>
);
