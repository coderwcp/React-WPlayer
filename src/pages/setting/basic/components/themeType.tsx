import { StoreState } from "@/redux";
import { connect } from "react-redux";
import { CSSProperties, useEffect, useState } from "react";
import { Typography, App, Button, Card, Flex, ColorPicker } from "antd";
import themeTypeData from "@/config/themeColor.json";
import { CustomActionType } from "@/redux/interface";
import { SettingState, ThemeData, ThemeType as CuThemeType } from "@/redux/modules/setting/reducer";
import { setThemeData, setThemeType } from "@/redux/modules/setting/action";

type Props = SettingState & {
	setThemeType: (val: CuThemeType | "custom") => CustomActionType;
	setThemeData: (val: ThemeData) => any;
};

const { Text } = Typography;

function _ThemeType(props: Props) {
	const { themeType, themeData, setThemeType, setThemeData } = props;

	const [customThemeData, setCustomThemeData] = useState({
		primaryColor: themeData.primaryColor,
		primaryColorHover: themeData.primaryColorHover,
		primaryColorSuppl: themeData.primaryColorSuppl,
		primaryColorPressed: themeData.primaryColorPressed
	});

	const {
		modal: { confirm },
		message: { success }
	} = App.useApp();
	const changeThemeColor = (data: ThemeData | null, reset: boolean) => {
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
		setThemeData(data ?? (themeTypeData.red as ThemeData));
	};

	const customThemePopup = () => {
		confirm({
			title: "自定义主题",
			icon: <></>,
			content: (
				<Flex vertical style={{ width: "100%" }}>
					<Typography.Text>主色</Typography.Text>
					<ColorPicker
						value={customThemeData.primaryColor}
						onChange={(_value, hex) => {
							setCustomThemeData({ ...customThemeData, primaryColor: hex });
						}}
					/>
					<div>132</div>
					<div>132</div>
					<div>132</div>
				</Flex>
			),
			okText: "自定义主题",
			wrapClassName: "custom-ant-modal-wrap",
			style: { top: "0" },
			onOk() {
				setCustomThemeData(customThemeData);
			}
		});
	};

	useEffect(() => {
		setCustomThemeData(themeData);
	}, [themeData]);

	return (
		<Card>
			<Flex align={"center"} justify={"space-between"}>
				<Flex vertical>
					<Text style={{ fontSize: "16px" }}>主题色选择</Text>
					<Text type={"secondary"} style={{ fontSize: "12px" }}>
						更换主题色，即时生效
					</Text>
				</Flex>
				{themeType !== "red" && <Button onClick={() => changeThemeColor(null, true)}>恢复默认</Button>}
			</Flex>
			<div className="theme-grid">
				{Object.keys(themeTypeData).map(key => {
					const _key = key as CuThemeType;
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
				{false && (
					<div
						onClick={() => customThemePopup()}
						className={`theme-grid__item ${(themeType as "custom") === "custom" && "current-theme"}`}
						style={
							{
								"--border-color": themeData.primaryColor,
								backgroundColor: themeData.primaryColor
							} as CSSProperties
						}
					>
						自定义主题
					</div>
				)}
			</div>
		</Card>
	);
}

const mapStateToProps = (state: StoreState) => state.setting;
const mapDispatchToProps = { setThemeType, setThemeData };
const ThemeType = connect(mapStateToProps, mapDispatchToProps)(_ThemeType);

export default ThemeType;
