import { NProgress } from "nprogress";
import { MessageInstance } from "antd/lib/message/interface";

// * global
declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
		$loadingBar: NProgress;
		$message: MessageInstance;
		$setSiteTitle: (val: string) => void;
		qrCheckInterval: Function;
	}
	interface Navigator {
		browserLanguage: string;
	}
}
export {};
