import { StoreState } from "@/redux";
import { connect } from "react-redux";
import themeTypeData from "@/config/themeColor.json";
import "./index.scss";
import { CSSProperties } from "react";
import { SettingState, ThemeData, ThemeType } from "@/redux/modules/setting/reducer";
import { setThemeType } from "@/redux/modules/setting/action";
import { CustomActionType } from "@/redux/interface";
import { Typography, App } from "antd";
// import { ExclamationCircleFilled } from "@ant-design/icons";

type Props = SettingState & { setThemeType: (val: ThemeType) => CustomActionType };

const { Text } = Typography;

const Theme = (props: Props) => {
	const { themeType, setThemeType } = props;
	const {
		modal: { confirm }
	} = App.useApp();
	const changeThemeColor = (data: ThemeData, reset: boolean) => {
		if (reset) {
			confirm({
				title: "asdasdasd"
			});
		}
		setThemeType(data!.label);
	};

	return (
		<>
			<Text>主题 {themeType}</Text>
			<div className="theme-grid">
				{Object.keys(themeTypeData).map(key => {
					const _key = key as ThemeType;
					const style: CSSProperties = {
						"--border-color": themeTypeData[_key].primaryColor,
						backgroundColor: themeTypeData[_key].primaryColor
					} as CSSProperties;
					return (
						<div
							key={_key}
							onClick={() => changeThemeColor(themeTypeData[_key] as ThemeData, true)}
							className={`theme-grid__item ${themeType === key && "current-theme"}`}
							style={style}
						>
							{themeTypeData[_key].name}
						</div>
					);
				})}
			</div>
		</>
	);
};

const mapStateToProps = (state: StoreState) => state.setting;
const mapDispatchToProps = { setThemeType };
const ConnectTheme = connect(mapStateToProps, mapDispatchToProps)(Theme);

const ThemeApp = () => {
	return (
		<App>
			<ConnectTheme />
		</App>
	);
};

export default ThemeApp;
