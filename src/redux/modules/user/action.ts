import { Dispatch } from "react";
import * as types from "../../types";
import {} from "./reducer";
import getLanguageData from "@/utils/getLanguageData";
import { getUserLevel, getUserSubcount } from "@/api/modules/user";
import { UserData } from "./data";

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
			const getOtherData = [getUserLevel(), getUserSubcount()];
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
