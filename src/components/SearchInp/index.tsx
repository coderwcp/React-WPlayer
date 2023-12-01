import { StoreState } from "@/redux";
import { connect } from "react-redux";

const _SearchInp = () => {
	return <>SearchInp</>;
};

const mapStateToProps = (state: StoreState) => state;
const mapDispatchToProps = {};
const SearchInp = connect(mapStateToProps, mapDispatchToProps)(_SearchInp);

export default SearchInp;
