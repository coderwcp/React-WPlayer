import { Action } from "redux";
import { defaultSiteState } from "./data";

export default function site(state = defaultSiteState, actions: Action<{ type: string; payload: any }>) {
	return state;
}
