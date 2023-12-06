import { StoreState } from "@/redux";
import "./index.scss";
import { Alert, Flex, Typography, QRCode, Skeleton, message } from "antd";
import { TabsProps } from "antd/lib";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { setUserLogin, userLogOut } from "@/redux/modules/user/action";
import { checkQrApi, getLoginStateApi, getQrKeyApi } from "@/api/modules/login";
import { useNavigate } from "react-router-dom";
import { preciseInterval } from "@/utils/preciseInterval";
import { CheckQrApiRes } from "@/api/interface";
import Tabs from "@/components/Tabs";

const { Text } = Typography;

type Props = StoreState & { setUserLogin: (val: boolean) => any; userLogOut: () => void };

function _Login(props: Props) {
	const logoUrl = import.meta.env.VITE_SITE_LOGO;
	const { themeData } = props.setting;
	const { setUserLogin, userLogOut } = props;
	const { t } = useTranslation();
	const navigate = useNavigate();

	const [qrImg, setQrImg] = useState<string>("");
	const [activeKey, setActiveKey] = useState<string>("phone");
	const [qrText, setQrText] = useState<string>("请打开云音乐 APP 扫码登录");

	const items: TabsProps["items"] = [
		{
			key: "qrcode",
			label: "扫码登录",
			children: (
				<Flex style={{ marginTop: "30px" }} vertical={true} align="center" gap={12}>
					{qrImg ? (
						<QRCode value={qrImg} size={220} color={themeData?.primaryColor} />
					) : (
						<Skeleton.Input active={true} style={{ width: "220px", height: "220px" }} />
					)}
					<Text>{qrText}</Text>
				</Flex>
			)
		},
		{
			key: "phone",
			label: "验证码登录",
			children: <Alert style={{ marginTop: "10px" }} message={"该登录方式暂时无法使用"} type="warning" />
		},
		{
			key: "email",
			label: "邮箱登录",
			children: <Alert style={{ marginTop: "10px" }} message={"该登录方式暂时无法使用"} type="warning" />
		}
	];

	const onChange = (key: string) => {
		const tabHandle = {
			qrcode() {
				getQrKeyApiData();
			},
			phone() {
				cancelQrCheckInterval();
			},
			email() {
				cancelQrCheckInterval();
			}
		};
		setActiveKey(key);
		const _key = key as keyof typeof tabHandle;
		tabHandle[_key] && tabHandle[_key]();
	};

	// 获取二维码登录 key
	const getQrKeyApiData = () => {
		// 检测是否登录
		getLoginStateApi().then(res => {
			if (res.data.profile && window.localStorage.getItem("cookie")) {
				window.$message.info(t("login.loggedIn"));
				setUserLogin(true);
				navigate("/user");
			} else {
				userLogOut();
				cancelQrCheckInterval();
				getQrKeyApi().then(res => {
					if (res.code == 200) {
						setQrImg(`https://music.163.com/login?codekey=${res.data.unikey}`);
						checkQrApiState(res.data.unikey);
					} else {
						window.$message.error(t("login.qrText6"));
					}
				});
			}
		});
	};

	// 登陆状态弹窗
	let loginStateMessage: typeof message | null;
	// 检测二维码登陆状态
	const checkQrApiState = (key: string) => {
		console.log(key);
		// 使用方法
		window.qrCheckInterval = preciseInterval(() => {
			if (!key) return false;
			checkQrApi(key).then(res => {
				const codeMap = {
					800: () => {
						getQrKeyApiData();
						loginStateMessage = null;
						setQrText(t("当前二维码已失效，请重新扫码"));
					},
					801: () => {
						loginStateMessage = null;
						setQrText(t("请打开云音乐 APP 扫码登录"));
					},
					802: () => {
						setQrText(t("扫描成功，请在客户端确认登录"));
						if (!loginStateMessage) {
							loginStateMessage = null;
						}
					},
					803: () => {
						loginStateMessage?.destroy();
						saveLoginData(res);
					}
				};
				const code = res.code as keyof typeof codeMap;

				codeMap[code] && codeMap[code]();
			});
		}, 1000);
	};

	// 储存登录信息
	const saveLoginData = (data: CheckQrApiRes) => {
		data.cookie = data.cookie.replaceAll(" HTTPOnly", "");
		// user.setCookie(data.cookie);
		// // 验证用户登录信息
		// getLoginStateApi().then(res => {
		// 	if (res.data.profile) {
		// 		user.setUserData(res.data.profile);
		// 		user.userLogin = true;
		// 		qrText.value = t("login.qrText4");
		// 		$message.success(t("login.qrText4"));
		// 		// 自动签到
		// 		if ($signIn) $signIn();
		// 		clearInterval(qrCheckInterval.value);
		// 		router.push("/user");
		// 	} else {
		// 		user.userLogOut();
		// 		$message.error(t("login.qrText5"));
		// 		getQrKeyApiData();
		// 	}
		// });
	};

	// 取消验证二维码扫描轮询
	const cancelQrCheckInterval = () => {
		window.qrCheckInterval && window.qrCheckInterval();
	};

	useEffect(() => {
		// 页面初始化判断是否是扫码登录
		activeKey === "qrcode" && getQrKeyApiData();
		window.$message.loading({
			content: "asdasd"
		});

		// 清理定时器
		return () => {
			cancelQrCheckInterval();
		};
	}, []);

	return (
		<Flex vertical={true} align="center" style={{ margin: "40px 0 0" }}>
			<img src={logoUrl} alt="" width={80} height={80} />
			<Text style={{ fontSize: "26px", fontWeight: "bold", margin: "15px 0 25px" }}>登录 WPlayer</Text>
			<Tabs accessKey={activeKey} defaultActiveKey="phone" items={items} onChange={key => onChange(key)} />
		</Flex>
	);
}

const mapStateToProps = (state: StoreState) => state;
const mapDispatchToProps = { setUserLogin, userLogOut };
const Login = connect(mapStateToProps, mapDispatchToProps)(_Login);

export default Login;
