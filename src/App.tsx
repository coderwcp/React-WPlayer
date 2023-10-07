import { Button, Card, ConfigProvider, DatePicker, DatePickerProps, theme as antdTheme } from "antd";
import { useTranslation } from "react-i18next";
import { setLanguage, setTheme } from "./redux/modules/setting/action";
import { connect } from "react-redux";
import { StoreState } from "./redux";
import ConnectTheme from "./pages/theme";
import { SettingState } from "./redux/modules/setting/reducer";
import useLanguage from "./hooks/useLanguage";
import useTheme from "./hooks/useTheme";

type Props = SettingState & { setTheme: () => any };

function App(props: Props) {
	const { t } = useTranslation();
	// redux 中的数据 & 映射action
	const { language, theme, setTheme } = props;
	// 切换多语言 hook
	const { i18nLocale, changeLanguage } = useLanguage();
	// 切换明暗主题
	useTheme();

	const onChange: DatePickerProps["onChange"] = (date, dateString) => {
		console.log(date, dateString);
	};

	return (
		<ConfigProvider
			locale={i18nLocale}
			theme={{ token: { borderRadius: 0 }, algorithm: antdTheme[theme === "dark" ? "darkAlgorithm" : "defaultAlgorithm"] }}
		>
			<Card bordered={false} bodyStyle={{ padding: 0, height: "100vh" }}>
				<ConfigProvider theme={{ token: { borderRadius: 8 } }}>
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
				</ConfigProvider>
			</Card>
		</ConfigProvider>
	);
}

const mapStateToProps = (state: StoreState) => state.setting;
const mapDispatchToProps = { setLanguage, setTheme };
const ConnectApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectApp;
