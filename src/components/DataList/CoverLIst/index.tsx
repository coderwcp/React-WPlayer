import "./index.scss";
import { StoreState } from "@/redux";
import { LoadingOutlined } from "@ant-design/icons";
import { Card, Image, Spin, Typography } from "antd";
import { connect } from "react-redux";

type Props = StoreState & {} & {
	// 列表数据
	listData: any[];
};

function _CoverLists(props: Props) {
	const { listData } = props;
	return (
		<div className="cover-list">
			{listData.map(item => {
				return (
					<Card
						className="cover-list__item"
						key={item.id}
						bodyStyle={{ padding: 0 }}
						style={{ borderRadius: 0, backgroundColor: "transparent" }}
						bordered={false}
					>
						<div className="cover">
							<Image
								width="100%"
								className="cover-img"
								preview={false}
								src={item.cover}
								fallback="/images/pic/default.png"
								placeholder={
									<div className="cover-loading">
										<Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
									</div>
								}
							/>
						</div>
						<Typography.Paragraph
							ellipsis={{
								rows: 2
							}}
							style={{ margin: 0 }}
						>
							{item.name}
						</Typography.Paragraph>
					</Card>
				);
			})}
		</div>
	);
}
const mapStateToProps = (state: StoreState) => state;
const mapDispatchToProps = {};
const CoverLists = connect(mapStateToProps, mapDispatchToProps)(_CoverLists);

export default CoverLists;
