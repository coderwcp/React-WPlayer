export type MusicState = {};

// 默认音乐数据
export const defaultMusicState = {
	// 是否展示播放界面
	showBigPlayer: false,
	// 是否展示播放控制条
	showPlayBar: true,
	// 是否展示播放列表
	showPlayList: false,
	// 播放状态
	playState: false,
	// 当前歌曲播放链接
	// playSongLink: null,
	// 当前歌曲歌词数据
	playSongLyric: {
		lrc: [],
		yrc: [],
		hasTran: false,
		hasYrc: false
	},
	// 当前歌曲歌词播放索引
	playSongLyricIndex: 0,
	// 每日推荐
	dailySongsData: [],
	// 歌单分类
	catList: {},
	// 精品歌单分类
	highqualityCatList: [],
	// 音乐频谱数据
	spectrumsData: {
		data: [],
		audio: null,
		analyser: null,
		audioCtx: null
	},
	// 是否正在加载数据
	isLoadingSong: false,
	// 持久化数据
	persistData: {
		// 搜索历史
		searchHistory: [],
		// 是否处于私人 FM 模式
		personalFmMode: false,
		// 私人 FM 数据
		personalFmData: {},
		// 播放列表类型
		playListMode: "list",
		// 喜欢音乐列表
		likeList: [],
		// 播放列表
		playlists: [],
		// 当前歌曲索引
		playSongIndex: 0,
		// 当前播放模式
		// normal-顺序播放 random-随机播放 single-单曲循环
		playSongMode: "normal",
		// 当前播放时间
		playSongTime: {
			currentTime: 0,
			duration: 0,
			barMoveDistance: 0,
			songTimePlayed: "00:00",
			songTimeDuration: "00:00"
		},
		// 播放音量
		playVolume: 0.7,
		// 静音前音量
		playVolumeMute: 0,
		// 列表状态
		playlistState: 0, // 0 顺序 1 单曲循环 2 随机
		// 播放历史
		playHistory: []
	}
};
