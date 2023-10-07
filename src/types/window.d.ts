import { NProgress } from "nprogress";
import { message } from "antd";

// * global
declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
		$loadingBar: NProgress;
		$message: message;
	}
	interface Navigator {
		browserLanguage: string;
	}
}
export {};
