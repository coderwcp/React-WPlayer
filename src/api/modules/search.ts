import http from "..";
import { Result, SearchHotItem } from "../interface";

/**
 * 获取热门搜索列表
 */
export const getSearchHotApi = () => {
	return http.get<Result<SearchHotItem[]>>(
		"/search/hot/detail",
		{
			timestamp: Date.now()
		},
		{ hiddenBar: false }
	);
};
