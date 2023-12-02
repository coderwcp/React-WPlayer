import http from "..";
import { CheckQrRes, Result } from "../interface";

/**
 * 获取登录状态
 */
export const getLoginState = () => {
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
export const getQrKey = () => {
	return http.get<Result<{ unikey: string }>>(
		"/login/qr/key",
		{
			timestamp: Date.now()
		},
		{ hiddenBar: true }
	);
};

/**
 * 检查二维码状态
 * @param {string} key 二维码key
 */
export const checkQr = (key: string) => {
	return http.get<CheckQrRes>(
		"/login/qr/check",
		{
			key,
			timestamp: Date.now()
		},
		{ hiddenBar: true }
	);
};
