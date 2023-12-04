import * as types from "../../types";

/**
 * 设置多语言
 */
export const setSearchInputActive = (payload: boolean) => ({
	type: types.SET_SEARCH_INPUT_ACTIVE,
	payload
});
