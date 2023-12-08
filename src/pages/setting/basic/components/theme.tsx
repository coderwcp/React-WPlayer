import { StoreState } from "@/redux";
import { setTheme } from "@/redux/modules/setting/action";
import { Theme as CuTheme } from "@/redux/modules/setting/reducer";
import { Card, Flex, Select, Typography } from "antd";
import { connect } from "react-redux";

type Props = StoreState & { setTheme: () => any };

function _Theme(props: Props) {
	const { theme } = props.setting;
	const { setTheme } = props;

	const options: { value: CuTheme; label: string }[] = [
		{ value: "light", label: "浅色模式" },
		{ value: "dark", label: "深色模式" }
	];
	const handleChange = () => {
		setTheme();
	};

	return (
		<Card>
			<Flex align="center" justify="space-between">
				<Typography.Text style={{ fontSize: "16px" }}>主题色选择</Typography.Text>
				<Select defaultValue={theme} style={{ width: 120 }} onChange={handleChange} options={options} />
			</Flex>
		</Card>
	);
}

const mapStateToProps = (state: StoreState) => state;
const mapDispatchToProps = { setTheme };
const Theme = connect(mapStateToProps, mapDispatchToProps)(_Theme);
export default Theme;
