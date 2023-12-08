import http from "..";
import { BannerType } from "../interface";

export const getBannerApi = () => {
	return http.get<{ banners: BannerType[]; code: number }>("/banner");
};
