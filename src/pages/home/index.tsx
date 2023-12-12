import { connect } from "react-redux";
import { StoreState } from "@/redux";
import Banner from "@/components/Banner";
import PaPlayLists from "@/components/Personalized/PaPlayLists";
import { useState } from "react";
import { Button, Drawer } from "antd";

function _App() {
	const [open, setOpen] = useState(true);
	const onClose = () => {
		setOpen(false);
	};
	const showDrawer = () => {
		setOpen(true);
	};

	return (
		<>
			<Banner />
			{/* 公共推荐 */}
			<PaPlayLists />

			{false && (
				<>
					<Button onClick={showDrawer}>打开弹窗</Button>
					<Drawer
						title="Basic Drawer"
						height="50vh"
						placement="bottom"
						closable={false}
						onClose={onClose}
						open={open}
						footer={<Button>提交</Button>}
					>
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
						<p>Some contents...</p>
					</Drawer>
				</>
			)}
		</>
	);
}

const mapStateToProps = (state: StoreState) => state;
const mapDispatchToProps = {};
const App = connect(mapStateToProps, mapDispatchToProps)(_App);

export default App;
