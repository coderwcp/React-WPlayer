import "./index.scss";
import { StoreState } from "@/redux";
import { connect } from "react-redux";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function _Nav(props: StoreState) {
	const { language } = props.setting;
	const logoUrl = import.meta.env.VITE_SITE_LOGO;
	const { t } = useTranslation();

	// 下拉框数据
	const [discoverOptions, setDiscoverOptions] = useState<MenuProps["items"]>([]);
	const [userOptions, setUserOptions] = useState<MenuProps["items"]>([]);

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

	useEffect(() => {
		setDiscoverOptionsHandle();
		setUserOptionsHandle(false);
	}, [language]);

	return (
		<nav>
			<div className="left">
				<div className="logo">
					<img src={logoUrl} alt="logo" />
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
					首页
				</Button>
				<Dropdown menu={{ items: discoverOptions }} placement="bottom" arrow>
					<Button type="primary" className="link">
						发现
					</Button>
				</Dropdown>
				<Dropdown menu={{ items: userOptions }} placement="bottom" arrow>
					<Button type="primary" className="link">
						音乐库
					</Button>
				</Dropdown>
			</div>
			<div className="right">rigth</div>
		</nav>
	);
}

const mapStateToProps = (state: StoreState) => state;
const mapDispatchToProps = {};
const Nav = connect(mapStateToProps, mapDispatchToProps)(_Nav);

export default Nav;
