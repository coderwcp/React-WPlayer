import "./index.scss";
import { TabsProps, Tabs as AntTabs, Card, Tag } from "antd";

const Tabs = (props: TabsProps) => {
	return (
		<>
			<AntTabs
				renderTabBar={(props, DefaultTabBar) => {
					return (
						<Card bordered={false} bodyStyle={{ padding: "3px", height: "40px" }}>
							<DefaultTabBar {...props} className="custom-tabs-header">
								{node => {
									const isActive = node.props.className.includes("ant-tabs-tab-active");
									return (
										<Tag
											style={{ margin: 0, padding: 0, height: "34px", flex: 1 }}
											bordered={false}
											color={isActive ? "" : "transparent"}
											key={node.key}
										>
											{node}
										</Tag>
									);
								}}
							</DefaultTabBar>
						</Card>
					);
				}}
				{...props}
			></AntTabs>
		</>
	);
};

export default Tabs;
