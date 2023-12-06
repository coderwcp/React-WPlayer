import "./index.scss";
import { useState } from "react";
import { Typography } from "antd";
import { StoreState } from "@/redux";
import { connect } from "react-redux";
import Tabs from "@/components/Tabs";
import Basic from "./basic";
import Plyer from "./plyer";
import Other from "./other";

type Props = StoreState & {};

function _Setting(props: Props) {
	console.log(props);

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
			<Typography.Title>全局设置</Typography.Title>
			<Tabs defaultActiveKey="basic" items={items}></Tabs>
		</>
	);
}

const mapStateToProps = (state: StoreState) => state;
const mapDispatchToProps = {};
const Setting = connect(mapStateToProps, mapDispatchToProps)(_Setting);

export default Setting;
