import * as types from "../../types";

/**
 * 设置搜索框激活状态
 */
export const setSearchInputActive = (payload: boolean) => ({
	type: types.SET_SEARCH_INPUT_ACTIVE,
	payload
});
/**
 * 设置站点标题
 */
export const setSiteTitle = (payload: string) => ({
	type: types.SET_SITE_TITLE,
	payload
});
