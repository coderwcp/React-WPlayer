import "./index.scss";
import Theme from "./components/theme";
import { Flex } from "antd";

function Basic() {
	return (
		<Flex vertical style={{ paddingTop: 20 }} gap={12}>
			<Theme />
			<Theme />
		</Flex>
	);
}

export default Basic;
