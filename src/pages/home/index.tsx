import { connect } from "react-redux";
import { StoreState } from "@/redux";
import Banner from "@/components/Banner";
import PaPlayLists from "@/components/Personalized/PaPlayLists";

function _App() {
	return (
		<>
			<Banner />
			{/* 公共推荐 */}
			<PaPlayLists />
		</>
	);
}

const mapStateToProps = (state: StoreState) => state;
const mapDispatchToProps = {};
const App = connect(mapStateToProps, mapDispatchToProps)(_App);

export default App;
