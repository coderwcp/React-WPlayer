import { StoreState } from "@/redux";
import { connect } from "react-redux";
import themeTypeData from "@/config/themeColor.json";
import "./index.scss";
import { CSSProperties } from "react";
import { SettingState, ThemeData, ThemeType } from "@/redux/modules/setting/reducer";
import { setThemeType } from "@/redux/modules/setting/action";
import { CustomActionType } from "@/redux/interface";
import { Typography, App, Button } from "antd";

type Props = SettingState & { setThemeType: (val: ThemeType) => CustomActionType };

const { Text } = Typography;

const Theme = (props: Props) => {
	const { themeType, setThemeType } = props;
	const {
		modal: { confirm },
		message: { success }
	} = App.useApp();
	const changeThemeColor = (data: ThemeData, reset: boolean) => {
		if (reset) {
			confirm({
				title: "恢复默认",
				content: "确认恢复全站主题色为默认",
				okText: "恢复默认",
				wrapClassName: "custom-ant-modal-wrap",
				style: { top: "0" },
				onOk() {
					success("重置成功");
					setThemeType("red");
				}
			});
		} else {
			success("主题色更换为 " + data!.name);
			setThemeType(data!.label);
		}
	};

	return (
		<>
			<Text>主题 {themeType}</Text>
			{themeType !== "red" && <Button onClick={() => changeThemeColor(null, true)}>恢复默认</Button>}
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
							onClick={() => changeThemeColor(themeTypeData[_key] as ThemeData, false)}
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

// 使用 App 组件包裹,使用hook的message\modal\notification才能根据主题切换样式
// const ThemeApp = () => {
// 	return (
// 		<App message={{ maxCount: 1 }}>
// 			<ConnectTheme />
// 		</App>
// 	);
// };

export default ConnectTheme;
