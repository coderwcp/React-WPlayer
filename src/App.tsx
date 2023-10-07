import { Button, Calendar, ConfigProvider } from "antd-mobile";
import i18n from "@/locales/index";
import { useTranslation } from "react-i18next";
import { setLanguage } from "./redux/modules/setting/action";
import { connect } from "react-redux";
import { StoreState } from "./redux";
// import { SettingState } from "./redux/modules/setting/data";
import { useEffect, useState } from "react";
import { getBrowserLang } from "./utils";
import zhCN from "antd-mobile/es/locales/zh-CN";
import enUS from "antd-mobile/es/locales/en-US";
import ConnectTheme from "./pages/theme";

function App(props: any) {
	// redux 中的数据 & 映射action
	const { language, setLanguage } = props;
	const { t } = useTranslation();
	// antd 多语言
	const [i18nLocale, setI18nLocale] = useState(zhCN);

	// 切换语言
	const changeLanguage = (lng: "en-US" | "zh-CN") => {
		setLanguage(lng);
	};

	// 设置 antd 语言国际化
	const setAntdLanguage = () => {
		// 如果 redux 中有默认语言就设置成 redux 的默认语言，没有默认语言就设置成浏览器默认语言
		if (language && language === "zh-CN") return setI18nLocale(zhCN);
		if (language && language === "en-US") return setI18nLocale(enUS);
		if (getBrowserLang() == "zh") return setI18nLocale(zhCN);
		if (getBrowserLang() == "en") return setI18nLocale(enUS);
	};

	useEffect(() => {
		// 全局使用国际化
		i18n.changeLanguage(language || getBrowserLang());
		setLanguage(language || getBrowserLang());
		setAntdLanguage();
	}, [language]);

	return (
		<ConfigProvider locale={i18nLocale}>
			<Button color="primary" onClick={() => changeLanguage(language === "en-US" ? "zh-CN" : "en-US")}>
				Solid
			</Button>
			<ConnectTheme />
			<div>{t("hello")}</div>
			<Calendar />
		</ConfigProvider>
	);
}

const mapStateToProps = (state: StoreState) => state.setting;
const mapDispatchToProps = { setLanguage };
const ConnectApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectApp;
