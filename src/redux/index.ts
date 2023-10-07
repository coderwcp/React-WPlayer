import { legacy_createStore as createStore, combineReducers, Store, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";
import user from "./modules/user/reducer";
import setting, { SettingState } from "./modules/setting/reducer";
import music from "./modules/music/reducer";
import site from "./modules/site/reducer";
import { MusicState } from "./modules/music/data";
import { UserState } from "./modules/user/data";
import { SiteState } from "./modules/site/data";

export type StoreState = {
	user: UserState;
	setting: SettingState;
	music: MusicState;
	site: SiteState;
};

// 创建reducer(拆分reducer)
const reducer = combineReducers({
	user,
	setting,
	music,
	site
});

// redux 持久化配置
const persistConfig = {
	key: "redux-state",
	storage: storage
};
const persistReducerConfig = persistReducer(persistConfig, reducer);

// 开启 redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 使用 redux 中间件
const middleWares = applyMiddleware(reduxThunk, reduxPromise);

// // 创建 store
const store: Store<StoreState> = createStore(persistReducerConfig, composeEnhancers(middleWares));

// 创建持久化 store
const persistor = persistStore(store);

export { store, persistor };
