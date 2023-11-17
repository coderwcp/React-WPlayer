import * as types from "../../types";
import {} from "./reducer";

/**
 * 更改展示播放界面
 */
export const setShowBigPlayer = (payload: boolean) => ({
	type: types.SET_SHOW_BIG_PLAYER,
	payload
});
