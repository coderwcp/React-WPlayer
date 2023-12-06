import http from "..";

/**
 * 获取用户等级信息
 */
export const getUserLevelApi = () => {
	return http.get("/user/level", {
		timestamp: new Date().getTime()
	});
};

/**
 * 获取用户订阅信息，包括歌单、收藏、MV和DJ数量
 */
export const getUserSubcountApi = () => {
	return http.get("/user/subcount", {
		timestamp: new Date().getTime()
	});
};
