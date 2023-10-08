import { AnyAction } from "redux";

export interface CustomActionType extends AnyAction {
	payload: any;
}
