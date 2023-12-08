import { Grid, Tag, Typography } from "antd";

const { useBreakpoint } = Grid;

function PaPlayLists() {
	const screens = useBreakpoint();
	return (
		<>
			<Typography.Title level={4}>推荐歌单</Typography.Title>
			Current break point:{" "}
			{Object.entries(screens)
				.filter(screen => !!screen[1])
				.map(screen => (
					<Tag color="blue" key={screen[0]}>
						{screen[0]}
					</Tag>
				))}
		</>
	);
}

export default PaPlayLists;
