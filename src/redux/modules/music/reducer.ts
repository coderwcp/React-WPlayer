import { MusicState, defaultMusicState } from "./data";
import { CustomActionType } from "@/redux/interface";
import * as types from "../../types";
import { produce } from "immer";

export default function site(state = defaultMusicState, action: CustomActionType) {
	return produce(state, (draftState: MusicState) => {
		switch (action.type) {
			// 更改展示播放界面
			case types.SET_LANGUAGE:
				draftState.showBigPlayer = action.payload;
				break;

			// 设置搜索历史
			case types.SET_SEARCH_HISTORY:
				{
					const { clean, name } = action.payload;
					if (clean) {
						draftState.persistData.searchHistory = [];
						return;
					}
					const index = draftState.persistData.searchHistory.indexOf(name);
					if (index !== -1) {
						draftState.persistData.searchHistory.splice(index, 1);
					}
					draftState.persistData.searchHistory.unshift(name);
					if (draftState.persistData.searchHistory.length > 30) {
						draftState.persistData.searchHistory.pop();
					}
				}
				break;
			default:
				return draftState;
		}
	});
}
