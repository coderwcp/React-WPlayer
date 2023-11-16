import { Button, Card, ConfigProvider, DatePicker, DatePickerProps, Layout, theme as antdTheme, App as AntApp } from "antd";
import { useTranslation } from "react-i18next";
import { setLanguage, setTheme } from "./redux/modules/setting/action";
import { connect } from "react-redux";
import { StoreState } from "./redux";
import ConnectTheme from "./pages/theme";
import useLanguage from "./hooks/useLanguage";
import useTheme from "./hooks/useTheme";
import "./App.scss";
import Nav from "./components/Nav";

const { Header, Content } = Layout;

type Props = StoreState & { setTheme: () => any };

function App(props: Props) {
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
		<ConfigProvider
			locale={i18nLocale}
			theme={{ token: {}, algorithm: antdTheme[theme === "dark" ? "darkAlgorithm" : "defaultAlgorithm"] }}
		>
			<Layout style={{ height: "100vh", overflow: "hidden", transition: "all  0.3s", paddingBottom: flag ? "70px" : "0" }}>
				<Header className="layout-header">
					<Nav></Nav>
				</Header>
				<Content style={{ flex: 1, overflowY: "auto" }} className="layout-content">
					<div className="main">
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
					</div>
				</Content>
			</Layout>
		</ConfigProvider>
	);
}

const mapStateToProps = (state: StoreState) => state;
const mapDispatchToProps = { setLanguage, setTheme };
const ConnectApp = connect(mapStateToProps, mapDispatchToProps)(App);

// 使用 App 组件包裹,使用hook的message\modal\notification才能根据主题切换样式
const WrapperApp = () => (
	<AntApp message={{ maxCount: 1 }}>
		<ConnectApp />
	</AntApp>
);

export default WrapperApp;
