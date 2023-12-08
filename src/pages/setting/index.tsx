import "./index.scss";
import { useState } from "react";
import { Typography } from "antd";
import { StoreState } from "@/redux";
import { connect } from "react-redux";
import Tabs from "@/components/Tabs";
import Basic from "./basic";
import Plyer from "./plyer";
import Other from "./other";
import { useTranslation } from "react-i18next";

// type Props = StoreState & {};

function _Setting() {
	const { t } = useTranslation();

	const [items] = useState([
		{
			key: "basic",
			label: "基础",
			children: <Basic />
		},
		{
			key: "plyer",
			label: "播放器",
			children: <Plyer />
		},
		{
			key: "other",
			label: "其他",
			children: <Other />
		}
	]);

	return (
		<>
			<Typography.Title>{t("setting.title")}</Typography.Title>
			<Tabs defaultActiveKey="basic" items={items}></Tabs>
		</>
	);
}

const mapStateToProps = (state: StoreState) => state;
const mapDispatchToProps = {};
const Setting = connect(mapStateToProps, mapDispatchToProps)(_Setting);

export default Setting;
