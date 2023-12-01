import { StoreState } from "@/redux";
import "./index.scss";
import { Alert, Flex, Tabs, Typography, QRCode } from "antd";
import { TabsProps } from "antd/lib";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";

const { Text } = Typography;

function _Login(props: StoreState) {
	const logoUrl = import.meta.env.VITE_SITE_LOGO;
	const { themeData } = props.setting;
	console.log("themeData", themeData);

	const { t } = useTranslation();
	const [qrText, setQrText] = useState<string>("请打开云音乐 APP 扫码登录");
	console.log(setQrText);

	const items: TabsProps["items"] = [
		{
			key: "1",
			label: t("扫码登录"),
			children: (
				<Flex vertical={true} align="center" gap={12}>
					<QRCode value={"-"} size={220} color={themeData?.primaryColor}></QRCode>
					<Text>{qrText}</Text>
				</Flex>
			)
		},
		{
			key: "2",
			label: t("验证码登录"),
			children: <Alert message={t("该登录方式暂时无法使用")} type="warning" />
		},
		{
			key: "3",
			label: t("邮箱登录"),
			children: <Alert message={t("该登录方式暂时无法使用")} type="warning" />
		}
	];

	const onChange = (key: string) => {
		console.log(key);
	};

	return (
		<Flex vertical={true} align="center" style={{ margin: "40px 0 0" }}>
			<img src={logoUrl} alt="" width={80} height={80} />
			<Text style={{ fontSize: "26px", fontWeight: "bold", margin: "15px 0 25px" }}>登录 WPlayer</Text>
			<Tabs defaultActiveKey="1" items={items} onChange={onChange} />
		</Flex>
	);
}

const mapStateToProps = (state: StoreState) => state;
const Login = connect(mapStateToProps)(_Login);

export default Login;
