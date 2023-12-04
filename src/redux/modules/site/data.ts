export type SiteState = {
	searchInputActive: boolean;
};

// 默认站点数据
export const defaultSiteState = {
	// 站点标题
	siteTitle: import.meta.env.VITE_SITE_TITLE,
	// 封面主题色
	songPicColor: "rgb(128,128,128)",
	// 搜索框激活状态
	searchInputActive: false
};
