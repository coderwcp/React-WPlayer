import { Button, Card, DatePicker, DatePickerProps } from "antd";
import { useTranslation } from "react-i18next";
import { setLanguage, setTheme, setThemeData } from "@/redux/modules/setting/action";
import { connect } from "react-redux";
import { StoreState } from "@/redux";
import ConnectTheme from "@/pages/theme";
import useLanguage from "@/hooks/useLanguage";
import useTheme from "@/hooks/useTheme";
import { ThemeData } from "@/redux/modules/setting/reducer";

type Props = StoreState & { setTheme: () => any; setThemeData: (val: ThemeData) => any };

function _App(props: Props) {
	const { t } = useTranslation();
	// redux 中的数据 & 映射action
	const { setTheme } = props;
	const { language, theme } = props.setting;

	// 切换多语言 hook
	const { changeLanguage } = useLanguage();
	// 切换明暗主题
	useTheme();

	const onChange: DatePickerProps["onChange"] = (date, dateString) => {
		console.log(date, dateString);
	};

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
