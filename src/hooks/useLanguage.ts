import { StoreState } from "@/redux";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import zhCN from "antd/locale/zh_CN";
import enUS from "antd/locale/en_US";
import { getBrowserLang } from "@/utils";
import i18n from "@/locales/index";
import { setLanguage } from "@/redux/modules/setting/action";

const useLanguage = () => {
	const dispatch = useDispatch();
	const { language } = useSelector((state: StoreState) => state.setting);

	// antd 多语言
	const [i18nLocale, setI18nLocale] = useState(zhCN);
	// 设置 antd 语言国际化
	const setAntdLanguage = () => {
		// 如果 redux 中有默认语言就设置成 redux 的默认语言，没有默认语言就设置成浏览器默认语言
		if (language && language === "zh-CN") return setI18nLocale(zhCN);
		if (language && language === "en-US") return setI18nLocale(enUS);
		if (getBrowserLang() == "zh") return setI18nLocale(zhCN);
		if (getBrowserLang() == "en") return setI18nLocale(enUS);
	};

	// 切换语言
	const changeLanguage = (lng: "en-US" | "zh-CN") => {
		dispatch(setLanguage(lng));
	};

	useEffect(() => {
		// 全局使用国际化
		i18n.changeLanguage(language || getBrowserLang());
		dispatch(setLanguage(language || getBrowserLang()));
		setAntdLanguage();
	}, [language]);
	return {
		i18nLocale,
		changeLanguage
	};
};

export default useLanguage;
