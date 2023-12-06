import * as types from "../../types";
import {} from "./reducer";

/**
 * 更改展示播放界面
 */
export const setShowBigPlayer = (payload: boolean) => ({
	type: types.SET_SHOW_BIG_PLAYER,
	payload
});

/**
 * 设置搜索历史
 */
export const setSearchHistory = (payload: { name: string; clean?: boolean }) => ({
	type: types.SET_SEARCH_HISTORY,
	payload
});
