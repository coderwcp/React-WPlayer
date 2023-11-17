import { RouteObject } from "../interface/index";
import { Navigate } from "react-router-dom";

const searchRouter: Array<RouteObject> = [
	{
		path: "/search",
		element: <Navigate to="/search/songs" />,
		meta: {
			title: "搜索"
		},
		children: [
			{
				path: "songs",
				element: <></>
			}
		]
	}
];

export default searchRouter;
