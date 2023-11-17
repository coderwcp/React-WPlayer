import "./App.scss";
import { Button, Card, ConfigProvider, DatePicker, DatePickerProps, Layout, theme as antdTheme, App as AntApp } from "antd";
import { useTranslation } from "react-i18next";
import { setLanguage, setTheme } from "@/redux/modules/setting/action";
import { connect } from "react-redux";
import { StoreState } from "@/redux";
import ConnectTheme from "@/pages/theme";
import useLanguage from "@/hooks/useLanguage";
import useTheme from "@/hooks/useTheme";
import Nav from "@/components/Nav";
import { HashRouter } from "react-router-dom";
import AuthRouter from "@/router/authRouter";
import Router from "@/router";
import { ThemeType } from "./redux/modules/setting/reducer";
import themeTypeData from "@/config/themeColor.json";
import { useEffect, useState } from "react";

const { Header, Content } = Layout;

type Props = StoreState & { setTheme: () => any };

function _App(props: Props) {
	const [themeToken, setThemeToken] = useState<{ token: String }>();
	console.log(themeToken, setThemeToken);

	const changeThemeColor = (val: ThemeType | "custom") => {
		let color = null;
		if (val !== "custom") {
			color = themeTypeData[val];
			console.log("当前主题色：" + val, color);
			// setThemeToken({
			// 	token: "color"
			// });
			// setting.themeData = color;
		} else {
			// color = setting.themeData;
			// console.log("当前主题色为自定义：" + val, color);
			// themeOverrides.value = {
			// 	common: color
			// };
		}
		// setCssVariable("--main-color", color.primaryColor);
		// setCssVariable("--main-second-color", color.primaryColor + "1f");
		// setCssVariable("--main-boxshadow-color", color.primaryColor + "26");
		// setCssVariable("--main-boxshadow-hover-color", color.primaryColor + "05");
	};

	useEffect(() => {
		changeThemeColor("red");
	}, []);

	const { t } = useTranslation();
	// redux 中的数据 & 映射action
	const { setTheme } = props;
	const { language, theme } = props.setting;
	const {
		persistData: { playlists },
		playState
	} = props.music;

	// 切换多语言 hook
	const { i18nLocale, changeLanguage } = useLanguage();
	// 切换明暗主题
	useTheme();

	const onChange: DatePickerProps["onChange"] = (date, dateString) => {
		console.log(date, dateString);
	};

	const flag = playlists[0] && playState;

	return (
		<HashRouter>
			<ConfigProvider
				locale={i18nLocale}
				theme={{
					token: {
						colorPrimary: "red"
					},
					algorithm: antdTheme[theme === "dark" ? "darkAlgorithm" : "defaultAlgorithm"]
				}}
			>
				<Layout style={{ height: "100vh", overflow: "hidden", transition: "all  0.3s", paddingBottom: flag ? "70px" : "0" }}>
					<Header className="layout-header">
						<Nav></Nav>
					</Header>
					<Content style={{ flex: 1, overflowY: "auto" }} className="layout-content">
						<div className="main">
							<AuthRouter>
								<Router></Router>
							</AuthRouter>
							{true && (
								<>
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
							)}
						</div>
					</Content>
				</Layout>
			</ConfigProvider>
		</HashRouter>
	);
}

const mapStateToProps = (state: StoreState) => state;
const mapDispatchToProps = { setLanguage, setTheme };
const ConnectApp = connect(mapStateToProps, mapDispatchToProps)(_App);

// 使用 AntApp 组件包裹,使用hook的message\modal\notification才能根据主题切换样式
const App = () => (
	<AntApp message={{ maxCount: 1 }}>
		<ConnectApp />
	</AntApp>
);

export default App;
