import http from "..";

export const getBannerApi = () => {
	return http.get("/banner");
};
