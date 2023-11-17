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
			default:
				return draftState;
		}
	});
}
