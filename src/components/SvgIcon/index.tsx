import { createFromIconfontCN } from "@ant-design/icons";
import { IconFontProps } from "@ant-design/icons/lib/components/IconFont";

const SvgIcon = (props: IconFontProps) => {
	const Component = createFromIconfontCN({
		scriptUrl: "//at.alicdn.com/t/c/font_4354024_kaecfm7uqt.js"
	});
	return <Component {...props} />;
};

export default SvgIcon;
