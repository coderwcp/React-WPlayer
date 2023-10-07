import { Action } from "redux";
// 默认用户数据
import { defaultUserState } from "./data";

export default function user(state = defaultUserState, actions: Action<{ type: string; payload: any }>) {
	return state;
}
