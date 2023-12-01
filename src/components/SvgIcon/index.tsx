import { createFromIconfontCN } from "@ant-design/icons";
import { IconFontProps } from "@ant-design/icons/lib/components/IconFont";

const MyIcon = (props: IconFontProps) => {
	const Component = createFromIconfontCN({
		scriptUrl: "//at.alicdn.com/t/c/font_4354024_6y7tzdvej9p.js"
	});
	return <Component {...props} />;
};

export default MyIcon;
