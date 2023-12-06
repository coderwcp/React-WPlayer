import { produce } from "immer";
import themeTypeData from "@/config/themeColor.json";
import * as types from "../../types";
import { CustomActionType } from "@/redux/interface";

export type Language = "zh-CN" | "en-US";
export type Theme = "light" | "dark";
export type ThemeType = keyof typeof themeTypeData;
export type ThemeData = {
	name: string;
	label: ThemeType | "custom";
	primaryColor: string;
	primaryColorHover: string;
	primaryColorSuppl: string;
	primaryColorPressed: string;
};
export type ListClickMode = "click" | "dblclick";
export type PlayerStyle = "cover";
export type SongLevel = "exhigh";
export type LyricsPosition = "left";
export type LyricsBlock = "start";
export type BackgroundImageShow = "blur";

export type SettingState = {
	language: Language;
	theme: Theme;
	themeType: ThemeType;
	themeData: ThemeData;
	searchHistory: boolean;
	themeAuto: boolean;
	bannerShow: boolean;
	autoSignIn: boolean;
	bottomLyricShow: boolean;
	showYrc: boolean;
	showYrcAnimation: boolean;
	showYrcTransform: boolean;
	showTransl: boolean;
	showRoma: boolean;
	lyricsBlur: boolean;
	musicFrequency: boolean;
	lrcMousePause: boolean;
	useUnmServer: boolean;
	countDownShow: boolean;
	showLyricSetting: boolean;
	songVolumeFade: boolean;
	memoryLastPlaybackPosition: boolean;
	listClickMode: ListClickMode;
	playerStyle: PlayerStyle;
	songLevel: SongLevel;
	lyricsPosition: LyricsPosition;
	lyricsBlock: LyricsBlock;
	backgroundImageShow: BackgroundImageShow;
	lyricsFontSize: number;
	listNumber: number;
};

// 全局数据
const defaultSettingState: SettingState = {
	// 全局主题
	theme: "light",
	themeAuto: true,
	themeType: "red",
	themeData: themeTypeData.red as ThemeData,
	// 搜索历史
	searchHistory: true,
	// 轮播图显示
	bannerShow: true,
	// 自动签到
	autoSignIn: true,
	// 列表点击方式
	listClickMode: "dblclick",
	// 播放器样式
	playerStyle: "cover",
	// 底栏歌词显示
	bottomLyricShow: true,
	// 是否显示逐字歌词
	showYrc: true,
	// 是否显示逐字歌词动画
	showYrcAnimation: true,
	// 是否显示逐字歌词上浮
	showYrcTransform: false,
	// 是否显示歌词翻译
	showTransl: true,
	// 是否显示歌词音译
	showRoma: true,
	// 歌曲音质
	songLevel: "exhigh",
	// 歌词位置
	lyricsPosition: "left",
	// 歌词滚动位置
	lyricsBlock: "start",
	// 歌词大小
	lyricsFontSize: 3.6,
	// 歌词模糊
	lyricsBlur: false,
	// 音乐频谱
	musicFrequency: false,
	// 鼠标移入歌词区域暂停滚动
	lrcMousePause: false,
	// 是否使用网易云解灰
	useUnmServer: true,
	// 播放背景是否显示图片
	backgroundImageShow: "blur",
	// 是否显示前奏等待
	countDownShow: true,
	// 是否显示歌词设置
	showLyricSetting: false,
	// 歌曲渐入渐出
	songVolumeFade: true,
	// 列表默认数量
	listNumber: 30,
	// 记忆上次播放位置
	memoryLastPlaybackPosition: true,
	// 语言
	language: "zh-CN"
};

export default function site(state = defaultSettingState, action: CustomActionType) {
	return produce(state, (draftState: SettingState) => {
		switch (action.type) {
			// 切换多语言
			case types.SET_LANGUAGE:
				draftState.language = action.payload;
				break;
			// 切换明暗主题
			case types.SET_THEME:
				draftState.theme = draftState.theme === "dark" ? "light" : "dark";
				break;
			// 设置主题类型
			case types.SET_THEME_TYPE:
				draftState.themeType = action.payload;
				break;
			// 设置主题颜色
			case types.SET_THEME_DATA:
				draftState.themeData = action.payload;
				break;
			default:
				return draftState;
		}
	});
}
