// 默认用户数据
import { UserState, defaultUserState } from "./data";
import { CustomActionType } from "@/redux/interface";
import { produce } from "immer";

export default function user(state = defaultUserState, action: CustomActionType) {
	return produce(state, (draftState: UserState) => {
		switch (action.type) {
			// // 更改展示播放界面
			// case types.SET_LANGUAGE:
			// 	draftState.showBigPlayer = action.payload;
			// 	break;
			default:
				return draftState;
		}
	});
}
