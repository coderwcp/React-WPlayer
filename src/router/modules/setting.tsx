import Setting from "@/pages/setting";
import { RouteObject } from "../interface/index";

const settingRouter: Array<RouteObject> = [
	{
		path: "/setting/index",
		element: <Setting />,
		meta: {
			title: "全局设置"
		}
	}
];

export default settingRouter;
