import { Button, Card, DatePicker, DatePickerProps } from "antd";
import { useTranslation } from "react-i18next";
import { setLanguage, setTheme, setThemeData } from "@/redux/modules/setting/action";
import { connect } from "react-redux";
import { StoreState } from "@/redux";
import ConnectTheme from "@/pages/theme";
import useLanguage from "@/hooks/useLanguage";
import useTheme from "@/hooks/useTheme";
import themeTypeData from "@/config/themeColor.json";
import { useEffect, useState } from "react";
import { AliasToken } from "antd/lib/theme/internal";
import { ThemeData, ThemeType } from "@/redux/modules/setting/reducer";

type Props = StoreState & { setTheme: () => any; setThemeData: () => any };

function _App(props: Props) {
	const [themeToken, setThemeToken] = useState<Partial<AliasToken>>();

	const { t } = useTranslation();
	// redux 中的数据 & 映射action
	const { setTheme, setThemeData } = props;
	const { language, theme, themeType, themeData } = props.setting;

	// 切换多语言 hook
	const { i18nLocale, changeLanguage } = useLanguage();
	// 切换明暗主题
	useTheme();

	const onChange: DatePickerProps["onChange"] = (date, dateString) => {
		console.log(date, dateString);
	};

	// 修改全局颜色
	const setCssVariable = (name: string, value: string) => {
		document.documentElement.style.setProperty(name, value);
	};

	// 配置主题色
	const changeThemeColor = (val: ThemeType | "custom") => {
		let color: ThemeData;
		if (val !== "custom") {
			color = themeTypeData[val] as ThemeData;
			console.log("当前主题色：" + val, color);
			setThemeToken({
				colorPrimary: color!.primaryColor
			});
			setThemeData(color);
		} else {
			color = themeData;
			console.log("当前主题色为自定义：" + val, color);
			setThemeToken({
				colorPrimary: color!.primaryColor
			});
		}
		setCssVariable("--main-color", color!.primaryColor);
		setCssVariable("--main-second-color", color!.primaryColor + "1f");
		setCssVariable("--main-boxshadow-color", color!.primaryColor + "26");
		setCssVariable("--main-boxshadow-hover-color", color!.primaryColor + "05");
	};

	useEffect(() => {
		changeThemeColor(themeType);
	}, [themeType]);

	return (
		<>
			Home
			<Button type="primary" color="primary" onClick={() => changeLanguage(language === "en-US" ? "zh-CN" : "en-US")}>
				切换中英文
			</Button>
			<Button type="primary" color="primary" onClick={() => setTheme()}>
				切换明暗主题
			</Button>
			<Button type="primary" color="primary" onClick={() => setTheme()}>
				{theme}
			</Button>
			<ConnectTheme />
			<div>{t("hello")}</div>
			<DatePicker onChange={onChange} />
			<ConnectTheme />
			<div>{t("hello")}</div>
			<DatePicker onChange={onChange} />
			<ConnectTheme />
			<div>{t("hello")}</div>
			<DatePicker onChange={onChange} />
			<ConnectTheme />
			<div>{t("hello")}</div>
			<DatePicker onChange={onChange} />
			<Card>456465465</Card>
		</>
	);
}

const mapStateToProps = (state: StoreState) => state;
const mapDispatchToProps = { setLanguage, setTheme, setThemeData };
const App = connect(mapStateToProps, mapDispatchToProps)(_App);

export default App;
