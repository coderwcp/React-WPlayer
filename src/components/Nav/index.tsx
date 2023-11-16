import "./index.scss";
import { StoreState } from "@/redux";
import { connect } from "react-redux";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

function _Nav() {
	const logoUrl = import.meta.env.VITE_SITE_LOGO;

	return (
		<nav>
			<div className="left">
				<div className="logo">
					<img src={logoUrl} alt="logo" />
				</div>
				{true && (
					<div className="controls">
						<LeftOutlined />
						<RightOutlined />
					</div>
				)}
			</div>
			<div className="center">center</div>
			<div className="right">rigth</div>
		</nav>
	);
}

const mapStateToProps = (state: StoreState) => state;
const mapDispatchToProps = {};
const Nav = connect(mapStateToProps, mapDispatchToProps)(_Nav);

export default Nav;
