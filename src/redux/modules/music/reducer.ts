import { Action } from "redux";
import { defaultMusicState } from "./data";

export default function site(state = defaultMusicState, actions: Action<{ type: string; payload: any }>) {
	return state;
}
