import http from "..";

export const getLoginState = () => {
	return http.get("/login/status", {
		timestamp: new Date().getTime()
	});
};
