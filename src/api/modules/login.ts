import http from "..";
import { CheckQrApiRes, Result } from "../interface";

/**
 * 获取登录状态
 */
export const getLoginStateApi = () => {
	return http.get<Result<{ profile: null | {} }>>(
		"/login/status",
		{
			timestamp: Date.now()
		},
		{ hiddenBar: true }
	);
};

/**
 * 生成二维码 key
 */
export const getQrKeyApi = () => {
	return http.get<Result<{ unikey: string }>>(
		"/login/qr/key",
		{
			timestamp: Date.now()
		},
		{ hiddenBar: false }
	);
};

/**
 * 检查二维码状态
 * @param {string} key 二维码key
 */
export const checkQrApi = (key: string) => {
	return http.get<CheckQrApiRes>(
		"/login/qr/check",
		{
			key,
			timestamp: Date.now()
		},
		{ hiddenBar: true }
	);
};
