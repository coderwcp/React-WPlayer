import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
	hiddenBar?: boolean;
}

// 默认配置
const config: AxiosRequestConfig = {
	baseURL: process.env.NODE_ENV === "production" ? import.meta.env.VITE_MUSIC_API : "/api",
	timeout: 30000,
	withCredentials: true
};

class RequestHttp {
	service: AxiosInstance;
	constructor(config: AxiosRequestConfig) {
		this.service = axios.create(config);
		/**
		 * @description 请求拦截器
		 * 客户端发送请求 -> [请求拦截器] -> 服务器
		 */
		this.service.interceptors.request.use(
			(config: CustomInternalAxiosRequestConfig) => {
				if (!config?.hiddenBar) window.$loadingBar && window.$loadingBar.start();
				return config;
			},
			error => {
				window.$loadingBar && window.$loadingBar.done();
				return Promise.reject(error);
			}
		);
		/**
		 * @description 响应拦截器
		 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
		 */
		this.service.interceptors.response.use(
			response => {
				window.$loadingBar && window.$loadingBar.done();
				return response.data;
			},
			error => {
				window.$loadingBar && window.$loadingBar.done();
				return Promise.reject(error);
			}
		);
	}

	/**
	 * @description 常用请求方法封装
	 */
	get<T>(url: string, params?: object, _object = {}): Promise<T> {
		return this.service.get(url, { params, ..._object });
	}
}

const http = new RequestHttp(config);

export default http;
