import { AnyAction } from "redux";

export interface CustomActionType<T = any> extends AnyAction {
	payload: T;
}
