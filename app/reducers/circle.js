import * as types from '../constants/ActionTypes';

const initialState = {
    isRefreshing: false,
	isFirstLoad: true, // 是否是第一次加载
	isLoadMore: false,
	noMore: false,
	index: 1,
	articleList: []
};

export default function read(state = initialState, action) {
	switch (action.type) {
		case types.FETCH_CIRCLE_LIST:
			state.isRefreshing = action.isRefreshing;
			return Object.assign({}, state);
			break;
		case types.RECEIVE_CIRCLE_LIST:
			state.isRefreshing = action.isRefreshing;
			state.articleList = action.responseData.postList;
			state.isFirstLoad = false;
			return Object.assign({}, state);
			break;
		case types.RECEIVE_CIRCLE_LIST_MORE:
			state.isRefreshing = action.isRefreshing;
			state.articleList = state.articleList.concat(action.responseData.postList);
			state.index = state.index + 1;
			return Object.assign({}, state);
			break;
		default:
			return state;
			break;
	}
}