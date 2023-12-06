import { Dispatch } from "react";
import * as types from "../../types";
import {} from "./reducer";
import getLanguageData from "@/utils/getLanguageData";
import { getUserLevelApi, getUserSubcountApi } from "@/api/modules/user";
import { UserData } from "./data";
// import { getLoginStateApi, getQrKeyApi } from "@/api/modules/login";
// import i18next from "i18next";
// import { useNavigate } from "react-router-dom";
/**
 * 更改展示播放界面
 */

interface MenuProps {
	type: string;
	payload: any;
}
export const setUserOtherData = (userLogin: boolean) => {
	return async (dispatch: Dispatch<MenuProps>) => {
		if (userLogin) {
			const getOtherData = [getUserLevelApi(), getUserSubcountApi()];
			Promise.all(getOtherData)
				.then(res => {
					console.log(res);
					return;
					dispatch({
						type: types.SET_LANGUAGE,
						payload: []
					});
				})
				.catch(err => {
					console.error(getLanguageData("getDataError"), err);
					window.$message.error(getLanguageData("getDataError"));
				});
		}
	};
};
// 更改用户数据
export const setUserData = (payload: UserData) => ({
	type: types.SET_USER_DATA,
	payload
});
// 退出登录
export const userLogOut = () => ({
	type: types.SET_USER_DATA,
	payload: ""
});

export const setUserLogin = (payload: boolean) => ({
	type: types.SET_USER_LOGIN,
	payload
});

/**
 * 获取二维码登录 key
 */
// export const getQrKeyApiData = async () => {
// 	return async (dispatch: Dispatch<{}>) => {
// 		getLoginStateApi().then(res => {
// 			if (res.data.profile && window.localStorage.getItem("cookie")) {
// 				window.$message.info(i18next.t("login.loggedIn"));
// 				dispatch(setUserLogin(true));
// 				const navigate = useNavigate();
// 				navigate("/user");
// 			} else {
// 				dispatch(userLogOut());
// 				// clearInterval(qrCheckInterval.value);
// 				getQrKeyApi().then(res => {
// 					if (res.code == 200) {
// 						qrImg.value = `https://music.163.com/login?codekey=${res.data.unikey}`;
// 						checkQrApiState(res.data.unikey);
// 					} else {
// 						window.$message.error(i18next.t("login.qrText6"));
// 					}
// 				});
// 			}
// 			return;
// 			dispatch({});
// 		});
// 	};
// };
