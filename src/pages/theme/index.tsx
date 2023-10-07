import { StoreState } from "@/redux";
import { connect } from "react-redux";
import themeConfigData from "@/config/themeColor.json";

const Theme = () => {
	return (
		<>
			{Object.entries(themeConfigData).forEach(item => {
				return <div>{item[0]}</div>;
			})}
		</>
	);
};

const mapStateToProps = (state: StoreState) => state.setting;
const mapDispatchToProps = {};

const ConnectTheme = connect(mapStateToProps, mapDispatchToProps)(Theme);

export default ConnectTheme;
