export interface Result<T = any> {
	code?: number;
	data: T;
	message?: string;
}

export interface CheckQrApiRes {
	code: number;
	cookie: string;
	message: string;
	avatarUrl: string;
	nickname: string;
}

export interface SearchHotItem {
	alg: string;
	content: string;
	iconType: number;
	iconUrl: string;
	score: number;
	searchWord: string;
	source: number;
	url: string;
}

export interface BannerType {
	imageUrl: string;
	targetType: number;
	targetId: number;
	url: string;
}
