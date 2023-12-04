import "./index.scss";
import { StoreState } from "@/redux";
import { Input } from "antd";
import { connect } from "react-redux";
import SvgIcon from "../SvgIcon";

type Props = StoreState & {};

const _SearchInp = (props: Props) => {
	const { searchInputActive } = props.site;
	console.log(searchInputActive);

	const inputFocus = () => {};

	return (
		<div className="searchInp">
			<Input
				className="input"
				style={{ borderRadius: "999px" }}
				prefix={<SvgIcon type="icon-search-line" style={{ fontSize: "16px" }} />}
				onFocus={() => inputFocus}
			/>
		</div>
	);
};

const mapStateToProps = (state: StoreState) => state;
const mapDispatchToProps = {};
const SearchInp = connect(mapStateToProps, mapDispatchToProps)(_SearchInp);

export default SearchInp;
