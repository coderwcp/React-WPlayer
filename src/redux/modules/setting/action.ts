import * as types from "../../types";

// * setLanguage
export const setLanguage = (language: string) => ({
	type: types.SET_LANGUAGE,
	payload: language
});
