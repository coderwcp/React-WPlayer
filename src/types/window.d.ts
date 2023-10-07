import { NProgress } from "nprogress";

// * global
declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
		$loadingBar: NProgress;
	}
	interface Navigator {
		browserLanguage: string;
	}
}
export {};
