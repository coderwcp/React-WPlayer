import "./index.scss";
import { StoreState } from "@/redux";
import { App, Card, Collapse, Flex, Input, List, Tag, Typography } from "antd";
import { connect } from "react-redux";
import SvgIcon from "../SvgIcon";
import { setSearchInputActive } from "@/redux/modules/site/action";
import { ChangeEventHandler, FocusEventHandler, KeyboardEventHandler, useEffect, useState } from "react";
import { CollapseProps } from "antd/lib";
import { getSearchHotApi } from "@/api/modules/search";
import { SearchHotItem } from "@/api/interface";
import { setSearchHistory } from "@/redux/modules/music/action";

type Props = StoreState & {
	setSearchInputActive: (val: boolean) => any;
	setSearchHistory: (val: { name: string; clean?: boolean }) => any;
};

const HOT_KEY = "hot";
const SUGGEST_KEY = "suggest";
type CollapseKey =
	| [typeof HOT_KEY]
	| [typeof SUGGEST_KEY]
	| [typeof HOT_KEY, typeof SUGGEST_KEY]
	| [typeof SUGGEST_KEY, typeof HOT_KEY]
	| [];

// const searchInpDom = document.getElementById("searchInp");

const _SearchInp = (props: Props) => {
	const {
		modal: { confirm },
		message: { success }
	} = App.useApp();

	const { searchInputActive } = props.site;
	const {
		persistData: { searchHistory }
	} = props.music;

	const { setSearchInputActive, setSearchHistory } = props;
	const [collapseKey, setCollapseKey] = useState<CollapseKey>(["hot", "suggest"]);
	const [searchData, setSearchData] = useState<{ hot: SearchHotItem[]; suggest: any }>({
		hot: [], // 热搜
		suggest: {} // 搜索建议
	});

	const [inputValue, setInputValue] = useState<string>("");

	const clearSearchHistory = () => {
		confirm({
			title: "是否删除",
			content: "是否删除搜索记录",
			okText: "确认",
			wrapClassName: "custom-ant-modal-wrap",
			style: { top: "0" },
			onOk() {
				success("重置成功");
				setSearchHistory({ name: "", clean: true });
			}
		});
	};

	const items: CollapseProps["items"] = [
		{
			key: HOT_KEY,
			label: <></>,
			children: (
				<Card className={`list ${searchInputActive && !inputValue && (searchHistory[0] || searchData.hot[0]) ? "" : "hide"}`}>
					<Typography.Text style={{ color: "var(--main-color)" }}>
						<Flex align={"center"} gap={5}>
							<SvgIcon type="icon-history-line" style={{ fontSize: "16px" }}></SvgIcon>
							搜索历史
						</Flex>
					</Typography.Text>
					<List
						dataSource={searchHistory}
						itemLayout={"vertical"}
						style={{ margin: "12px 0" }}
						renderItem={item => (
							<Tag
								bordered={false}
								style={{ borderRadius: "99px" }}
								onClick={() => {
									setInputValue(item);
								}}
							>
								{item}
							</Tag>
						)}
					/>
					<Flex align="center" justify="center" style={{ marginBottom: "18px" }}>
						<Typography.Text type={"secondary"} onClick={() => clearSearchHistory()}>
							<SvgIcon type="icon-delete-bin-5-fill" style={{ fontSize: "16px" }}></SvgIcon> 删除搜索历史
						</Typography.Text>
					</Flex>
					<Typography.Text style={{ color: "var(--main-color)" }}>
						<Flex align={"center"} gap={5}>
							<SvgIcon type="icon-fire-fill" style={{ fontSize: "16px" }}></SvgIcon>
							热搜榜
						</Flex>
					</Typography.Text>
					<List
						dataSource={searchData.hot}
						renderItem={item => <List.Item style={{ borderBlockEnd: "none" }}>{<>{item.searchWord}</>}</List.Item>}
					/>
				</Card>
			)
		},
		{
			key: SUGGEST_KEY,
			label: <></>,
			children: <Card className={`list ${searchInputActive && inputValue ? "" : "hide"}`}>1654651321</Card>
		}
	];

	const onChange = (key: string | string[]) => {
		console.log(key);
	};

	const inputFocus: FocusEventHandler<HTMLInputElement> = () => {
		setSearchInputActive(true);
		setCollapseKey(["hot"]);
		getSearchHotData();
	};
	const inputBlur = () => {
		setSearchInputActive(false);
	};
	const inputChange: ChangeEventHandler<HTMLInputElement> = e => {
		setInputValue(e.target.value);
	};
	const inputkeydown: KeyboardEventHandler<HTMLInputElement> = e => {
		if (!inputValue.trim().length) return;
		console.log("执行搜索" + inputValue.trim());
		(e.target as HTMLInputElement).blur();
		setSearchHistory({ name: inputValue.trim() });
	};

	// 获取搜索热词
	const getSearchHotData = async () => {
		const { data, code } = await getSearchHotApi();
		if (code !== 200) return;
		setSearchData({ ...searchData, hot: data });
	};

	useEffect(() => {
		searchInputActive && setSearchInputActive(false);
	}, []);

	return (
		<Flex align="center" justify="flex-end" className="searchInp">
			<Input
				id="searchInp"
				value={inputValue}
				className={`input ${searchInputActive ? "focus" : ""}`}
				style={{ borderRadius: "999px" }}
				prefix={
					<SvgIcon type="icon-search-line" style={{ fontSize: "16px", color: searchInputActive ? "var(--main-color)" : "" }} />
				}
				allowClear={searchInputActive}
				onBlur={inputBlur}
				onChange={inputChange}
				onFocus={inputFocus}
				onPressEnter={inputkeydown}
			/>

			<Card className={`list ${searchInputActive ? "" : "hide"}`}>
				{!inputValue.trim() ? (
					<>
						<Typography.Text style={{ color: "var(--main-color)" }}>
							<Flex align={"center"} gap={5}>
								<SvgIcon type="icon-history-line" style={{ fontSize: "16px" }}></SvgIcon>
								搜索历史
							</Flex>
						</Typography.Text>
						<List
							dataSource={searchHistory}
							itemLayout={"vertical"}
							style={{ margin: "12px 0" }}
							renderItem={item => (
								<Tag
									bordered={false}
									style={{ borderRadius: "99px" }}
									onClick={() => {
										setInputValue(item);
									}}
								>
									{item}
								</Tag>
							)}
						/>
						<Flex align="center" justify="center" style={{ marginBottom: "18px" }}>
							<Typography.Text type={"secondary"} onClick={() => clearSearchHistory()}>
								<SvgIcon type="icon-delete-bin-5-fill" style={{ fontSize: "16px" }}></SvgIcon> 删除搜索历史
							</Typography.Text>
						</Flex>
						<Typography.Text style={{ color: "var(--main-color)" }}>
							<Flex align={"center"} gap={5}>
								<SvgIcon type="icon-fire-fill" style={{ fontSize: "16px" }}></SvgIcon>
								热搜榜
							</Flex>
						</Typography.Text>
						<List
							dataSource={searchData.hot}
							renderItem={item => <List.Item style={{ borderBlockEnd: "none" }}>{<>{item.searchWord}</>}</List.Item>}
						/>
					</>
				) : (
					<></>
				)}
			</Card>
			<Collapse
				style={{ display: "none", width: "0", height: "0px" }}
				defaultActiveKey={collapseKey}
				ghost
				expandIcon={() => <></>}
				items={items}
				onChange={onChange}
			/>
		</Flex>
	);
};

const mapStateToProps = (state: StoreState) => state;
const mapDispatchToProps = { setSearchInputActive, setSearchHistory };
const SearchInp = connect(mapStateToProps, mapDispatchToProps)(_SearchInp);

export default SearchInp;
