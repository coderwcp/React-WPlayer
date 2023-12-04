import { SiteState, defaultSiteState } from "./data";
import { produce } from "immer";
import * as types from "../../types";
import { CustomActionType } from "@/redux/interface";

export default function site(state = defaultSiteState, actions: CustomActionType) {
	return produce(state, (draftState: SiteState) => {
		const map = {
			[types.SET_SEARCH_INPUT_ACTIVE]: () => {
				draftState.searchInputActive = actions.payload;
			}
		};
		const mapKey = actions.type as keyof typeof map;
		map[mapKey] && map[mapKey]();
	});
	return state;
}
