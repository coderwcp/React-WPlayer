import useLanguage from "@/hooks/useLanguage";
import { StoreState } from "@/redux";
import { Language as LanguageType } from "@/redux/modules/setting/reducer";
import { Card, Flex, Select, Typography } from "antd";
import { connect } from "react-redux";

type Props = StoreState;

function _Language(props: Props) {
	const { language } = props.setting;
	const { changeLanguage } = useLanguage();

	const options: { value: LanguageType; label: string }[] = [
		{ value: "zh-CN", label: "中文简体" },
		{ value: "en-US", label: "English" }
	];
	const handleChange = (value: LanguageType) => {
		changeLanguage(value);
	};

	return (
		<Card>
			<Flex align="center" justify="space-between">
				<Typography.Text style={{ fontSize: "16px" }}>主题色选择</Typography.Text>
				<Select defaultValue={language} style={{ width: 120 }} onChange={handleChange} options={options} />
			</Flex>
		</Card>
	);
}

const mapStateToProps = (state: StoreState) => state;
const mapDispatchToProps = {};
const Language = connect(mapStateToProps, mapDispatchToProps)(_Language);
export default Language;
