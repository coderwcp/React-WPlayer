import * as types from "../../types";
import { Language } from "./reducer";

/**
 * 设置多语言
 */
export const setLanguage = (payload: Language) => ({
	type: types.SET_LANGUAGE,
	payload
});
/**
 * 设置明暗主题
 */
export const setTheme = () => ({
	type: types.SET_THEME
});
