import { StoreState } from "@/redux";
import { connect } from "react-redux";
import themeConfigData from "@/config/themeColor.json";

const Theme = () => {
	type themeConfigDataKeys = keyof typeof themeConfigData;

	return (
		<>
			<div>主题</div>
			<span>
				{Object.keys(themeConfigData).map(key => {
					const _key = key as themeConfigDataKeys;
					return <div key={_key}>{themeConfigData[_key].name}</div>;
				})}
			</span>
		</>
	);
};

const mapStateToProps = (state: StoreState) => state.setting;
const mapDispatchToProps = {};

const ConnectTheme = connect(mapStateToProps, mapDispatchToProps)(Theme);

export default ConnectTheme;
