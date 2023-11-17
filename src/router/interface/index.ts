export interface MetaProps {
	keepAlive?: boolean;
	needLogin?: boolean;
	title: string;
	key?: string;
	hideTab?: boolean;
	hideNav?: boolean;
}

export interface RouteObject {
	caseSensitive?: boolean;
	children?: RouteObject[];
	element?: React.ReactNode;
	index?: false;
	path?: string;
	meta?: MetaProps;
	isLink?: string;
}
