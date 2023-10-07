import http from "..";

export const getBanner = () => {
	return http.get("/banner");
};
