import { StoreState } from "@/redux";
import { Typography } from "antd";
import { connect } from "react-redux";
import CoverLists from "../DataList/CoverLIst";
import { getPersonalizedApi } from "@/api/modules/home";
import { useEffect, useState } from "react";

function _PaPlayLists() {
	const [personalizedData, setPersonalizedData] = useState<{ id: number; cover: string; name: string; playCount: number }[]>([]);

	// 获取推荐数据
	const getPersonalizedData = (type = null, limit = 12) => {
		getPersonalizedApi(type, limit).then(res => {
			console.log(res);
			setPersonalizedData([]);
			if (res.result) {
				setPersonalizedData(
					res.result.map(v => {
						return { id: v.id, cover: v.picUrl, name: v.name, playCount: v.playCount };
					})
				);
			} else {
				window.$message.error("歌单推荐内容为空");
			}
		});
	};

	useEffect(() => {
		getPersonalizedData();
	}, []);

	return (
		<>
			<Typography.Title level={4}>推荐歌单</Typography.Title>
			<CoverLists listData={personalizedData} />
		</>
	);
}

const mapStateToProps = (state: StoreState) => state;
const mapDispatchToProps = {};
const PaPlayLists = connect(mapStateToProps, mapDispatchToProps)(_PaPlayLists);

export default PaPlayLists;
