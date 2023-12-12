import http from "..";
import { BannerType } from "../interface";

/**
 * 获取网站首页轮播图列表
 */
export const getBannerApi = () => {
	return http.get<{ banners: BannerType[]; code: number }>("/banner");
};

/**
 * 获取首页推荐内容列表
 * @param {string} [type=null] - 推荐类型，可选值包括"null"（默认歌单），"mv"（MV），"newsong"（新音乐），"djprogram"（电台）和"privatecontent"（独家放送）
 * @param {number} [limit=10] - 返回结果的数量，默认为10
 */
export namespace Personalized {
	export interface ResData {
		category: number;
		code: number;
		hasTaste: boolean;
		result: DefaultItem[];
	}
	export interface DefaultItem {
		alg: string;
		canDislike: boolean;
		copywriter: string;
		highQuality: boolean;
		id: number;
		name: string;
		picUrl: string;
		playCount: number;
		trackCount: number;
		trackNumberUpdateTime: number;
		type: number;
	}
}
export const getPersonalizedApi = (type: string | null = null, limit: number = 10) => {
	return http.get<Personalized.ResData>(`/personalized/${type}`, { limit });
};
