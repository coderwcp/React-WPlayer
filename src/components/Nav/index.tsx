import "./index.scss";
import { StoreState } from "@/redux";
import { connect } from "react-redux";
import { AlertOutlined, AppstoreOutlined, HomeOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, MenuProps, Space, Typography, Flex } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SearchInp from "../SearchInp";
import SvgIcon from "../SvgIcon";
import { setTheme } from "@/redux/modules/setting/action";

const { Text } = Typography;

function _Nav(props: StoreState & { setTheme: () => any }) {
	const { language, theme } = props.setting;
	const { setTheme } = props;

	const { userData } = props.user;
	const logoUrl = import.meta.env.VITE_SITE_LOGO;
	const { t } = useTranslation();

	const navigate = useNavigate();

	// 下拉框数据
	const [discoverOptions, setDiscoverOptions] = useState<MenuProps["items"]>([]);
	const [userOptions, setUserOptions] = useState<MenuProps["items"]>([]);
	const [mbMenuOptions, setMbMenuOptions] = useState<MenuProps["items"]>([]);
	const [mbUserOptions, setMbUserOptions] = useState<MenuProps["items"]>([]);

	const avatar = () => (
		<Avatar
			src={userData.avatarUrl ? userData.avatarUrl.replace(/^http:/, "https:") + "?param=60y60" : "/images/ico/user-filling.svg"}
		/>
	);
	const setDiscoverOptionsHandle = () => {
		setDiscoverOptions([
			{
				label: t("nav.discoverChildren.playlists"),
				key: "/discover/playlists"
			},
			{
				label: t("nav.discoverChildren.toplists"),
				key: "/discover/toplists"
			},
			{
				label: t("nav.discoverChildren.artists"),
				key: "/discover/artists"
			}
		]);
	};
	const setUserOptionsHandle = (val: boolean) => {
		setUserOptions(
			val
				? []
				: [
						{
							label: "登录",
							key: "/login"
						}
				  ]
		);
	};
	const setMbMenuOptionsHandle = () => {
		setMbMenuOptions([
			{
				label: "首页",
				key: "/home4",
				icon: <HomeOutlined />
			},
			{
				label: "发现",
				key: "/home5",
				icon: <AlertOutlined />
			},
			{
				label: "音乐库",
				key: "/home6",
				icon: <AppstoreOutlined />
			}
		]);
	};

	const setMbUserOptionsHandle = () => {
		setMbUserOptions([
			{
				label: (
					<>
						<Flex align="center" gap={12}>
							{avatar()}
							<Flex vertical={true}>
								<Text strong={true}>未登录</Text>
								<Text type="secondary" style={{ fontSize: "12px" }}>
									登录后享受完整功能
								</Text>
							</Flex>
						</Flex>
					</>
				),
				key: "loginStatus"
			},
			{
				type: "divider"
			},
			{
				label: <Text>{theme === "dark" ? "浅色模式" : "深色模式"}</Text>,
				key: "changeTheme",
				icon:
					theme === "dark" ? (
						<SvgIcon type="icon-sun-foggy-line" style={{ fontSize: "16px" }} />
					) : (
						<SvgIcon type="icon-moon-clear-line" style={{ fontSize: "16px" }} />
					)
			},
			{
				label: "播放历史",
				key: "history",
				icon: <SvgIcon type="icon-history-line" style={{ fontSize: "16px" }} />
			},
			{
				label: "全局设置",
				key: "setting",
				icon: <SvgIcon type="icon-settings-2-line" style={{ fontSize: "16px" }} />
			},
			{
				label: "登录账号",
				key: "user",
				icon: <SvgIcon type="icon-logout-box-r-line" style={{ fontSize: "16px" }} />
			}
		]);
	};

	const mbUserClickHandle: MenuProps["onClick"] = ({ key }) => {
		const keyMap = {
			loginStatus() {
				navigate("/login");
			},
			changeTheme() {
				setTheme();
			},
			history() {
				console.log("history");
			},
			setting() {
				console.log("setting");
			},
			user() {
				console.log("user");
			}
		};
		const keyName = key as keyof typeof keyMap;
		keyMap[keyName] && keyMap[keyName]();
	};

	useEffect(() => {
		setDiscoverOptionsHandle();
		setUserOptionsHandle(false);
		setMbMenuOptionsHandle();
		setMbUserOptionsHandle();
	}, [language, theme]);

	return (
		<nav>
			<div className="left">
				<div className="logo">
					<img src={logoUrl} alt="logo" onClick={() => navigate("/")} />
				</div>
				{true && (
					<div className="controls">
						<LeftOutlined style={{ width: "22px", height: "22px" }} />
						<RightOutlined style={{ width: "22px", height: "22px" }} />
					</div>
				)}
			</div>
			<div className="center">
				<Button type="primary" className="link">
					<Text>首页</Text>
				</Button>
				<Dropdown menu={{ selectable: false, items: discoverOptions }} placement="bottom" arrow>
					<Button type="primary" className="link">
						<Text>发现</Text>
					</Button>
				</Dropdown>
				<Dropdown menu={{ selectable: false, items: userOptions }} placement="bottom" arrow>
					<Button type="primary" className="link">
						<Text>音乐库</Text>
					</Button>
				</Dropdown>
			</div>
			<div className="right">
				<Space wrap size={12}>
					<SearchInp />
					<Dropdown className="mb-menu" menu={{ selectable: false, items: mbMenuOptions }} placement="bottom" arrow>
						<Button shape="circle" icon={<SvgIcon type="icon-menu-line" />} />
					</Dropdown>
					<Dropdown
						menu={{ selectable: false, items: mbUserOptions, onClick: mbUserClickHandle }}
						placement="bottomLeft"
						arrow
						overlayClassName="user-option"
					>
						{avatar()}
					</Dropdown>
				</Space>
			</div>
		</nav>
	);
}

const mapStateToProps = (state: StoreState) => state;
const mapDispatchToProps = { setTheme };
const Nav = connect(mapStateToProps, mapDispatchToProps)(_Nav);

export default Nav;
