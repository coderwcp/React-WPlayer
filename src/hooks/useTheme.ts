import { StoreState } from "@/redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const useTheme = () => {
	const { theme } = useSelector((state: StoreState) => state.setting);
	const themeColorMeta = document.querySelector('meta[name="theme-color"]');

	const themeMap = {
		dark: {
			bgColor: "#18181c"
		},
		light: {
			bgColor: "#ffffff"
		}
	};
	// 设置 meta[name="theme-color"] content 属性
	const changeTheme = () => {
		themeColorMeta?.setAttribute("content", themeMap[theme].bgColor);
	};

	useEffect(() => {
		changeTheme();
	}, [theme]);
};

export default useTheme;
