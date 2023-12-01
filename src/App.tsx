import "./App.scss";
import { ConfigProvider, Layout, theme as antdTheme, App as AntApp } from "antd";
import { setLanguage, setTheme, setThemeData } from "@/redux/modules/setting/action";
import { connect } from "react-redux";
import { StoreState } from "@/redux";
import useLanguage from "@/hooks/useLanguage";
import useTheme from "@/hooks/useTheme";
import Nav from "@/components/Nav";
import { HashRouter } from "react-router-dom";
import AuthRouter from "@/router/authRouter";
import Router from "@/router";
import { ThemeData, ThemeType } from "./redux/modules/setting/reducer";
import themeTypeData from "@/config/themeColor.json";
import { useEffect, useState } from "react";
import { AliasToken } from "antd/lib/theme/internal";

const { Header, Content } = Layout;

type Props = StoreState & { setTheme: () => any };

function _App(props: Props) {
	const [themeToken, setThemeToken] = useState<Partial<AliasToken>>();

	// redux 中的数据 & 映射action
	const { theme, themeType, themeData } = props.setting;
	const {
		persistData: { playlists },
		playState
	} = props.music;

	// 切换多语言 hook
	const { i18nLocale } = useLanguage();
	// 切换明暗主题
	useTheme();

	const flag = playlists[0] && playState;

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
		<HashRouter>
			<ConfigProvider
				locale={i18nLocale}
				theme={{
					token: { ...themeToken, fontFamily: "PingFang, sans-serif" },
					algorithm: antdTheme[theme === "dark" ? "darkAlgorithm" : "defaultAlgorithm"]
				}}
			>
				{/* 使用 AntApp 组件包裹,使用hook的message\modal\notification才能根据主题切换样式 */}
				<AntApp message={{ maxCount: 1 }}>
					<Layout style={{ height: "100vh", overflow: "hidden", transition: "all  0.3s", paddingBottom: flag ? "70px" : "0" }}>
						<Header className="layout-header">
							<Nav></Nav>
						</Header>
						<Content style={{ flex: 1, overflowY: "auto" }} className="layout-content">
							<div className="main">
								<AuthRouter>
									<Router></Router>
								</AuthRouter>
							</div>
						</Content>
					</Layout>
				</AntApp>
			</ConfigProvider>
		</HashRouter>
	);
}

const mapStateToProps = (state: StoreState) => state;
const mapDispatchToProps = { setLanguage, setTheme };
const App = connect(mapStateToProps, mapDispatchToProps)(_App);

export default App;
