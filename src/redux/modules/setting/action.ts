import * as types from "../../types";
import { Language, ThemeData, ThemeType } from "./reducer";

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
/**
 * 设置主题类型
 */
export const setThemeType = (payload: ThemeType) => ({
	type: types.SET_THEME_TYPE,
	payload
});
/**
 * 设置主题颜色
 */
export const setThemeData = (payload: ThemeData) => ({
	type: types.SET_THEME_DATA,
	payload
});
