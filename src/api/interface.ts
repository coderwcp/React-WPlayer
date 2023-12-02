export interface Result<T = any> {
	code?: number;
	data: {
		code: number;
	} & T;
}

export interface CheckQrRes {
	code: number;
	cookie: string;
	message: string;
	avatarUrl: string;
	nickname: string;
}
