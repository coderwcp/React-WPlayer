import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import zhCN from "./modules/zh-CN";
import enUS from "./modules/en-US";

i18next.use(initReactI18next).init({
	lng: "zh-CN", // 默认语言
	debug: true,
	fallbackLng: "zh-CN", // 如果当前语言没有对应的翻译，将使用该语言作为备用
	interpolation: {
		escapeValue: false // 不要对翻译的文本进行转义，以支持 HTML 标签
	},
	resources: {
		"zh-CN": { translation: zhCN },
		"en-US": { translation: enUS }
	}
});

export default i18next;
