// 用户数据
export interface UserData {}

export type UserState = {
	userLogin: boolean; // 是否登陆
	cookie: string; // 登录凭证
	userData: UserData; // 用户数据
};

// 默认用户数据
export const defaultUserState = {
	// 用户登录状态
	userLogin: false,
	// 用户 cookie
	cookie: null,
	// 用户基础数据
	userData: {},
	// 用户详情数据
	userOtherData: {},
	// 用户歌单
	userPlayLists: {
		isLoading: false,
		has: false,
		own: [], // 创建歌单
		like: [] // 收藏歌单
	},
	// 用户专辑
	userAlbum: {
		isLoading: false,
		has: false,
		list: []
	},
	// 用户收藏歌手
	userArtistLists: {
		isLoading: false,
		has: false,
		list: []
	}
};
