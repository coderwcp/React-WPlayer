import "./index.scss";
import { Flex } from "antd";
import ThemeType from "./components/themeType";
import Language from "./components/language";
import Theme from "./components/theme";

function Basic() {
	return (
		<Flex vertical style={{ paddingTop: 20 }} gap={12}>
			<ThemeType />
			<Language />
			<Theme />
		</Flex>
	);
}

export default Basic;
