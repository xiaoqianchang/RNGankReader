/**
 * 有了 Action 来传达需要操作的信息(比如：网络数据)，那么就需要有根据这个信息来做对应操作的方法，这就是 Reducer。
 * Reducer 一般为简单的处理函数，通过传入旧的 state 和指示操作的 action 来更新 state
 */

import * as types from '../constants/ActionTypes';

/**
 * 定义旧的 state
 */
const initialState = [{
	isRefreshing: false,
	isFirstLoaded: true,
	isLoadMore: false,
	noMore: false,
	index: 1,
	articleList: []
},{
	isRefreshing: false,
	isFirstLoaded: true,
	loading: false,
	isLoadMore: false,
	noMore: false,
	index: 1,
	articleList: []
},{
	isRefreshing: false,
	isFirstLoaded: true,
	loading: false,
	isLoadMore: false,
	noMore: false,
	index: 1,
	articleList: []
}];

/**
 * 通过传入旧的 state 和指示操作的 action 来更新 state。
 * @param {*} state 旧的 state
 * @param {*} action 获取、传递数据的action
 */
export default function read(state = initialState, action) {
	switch (action.type) {
		case types.FETCH_ARTICLE_LIST:
			switch (action.category) {
				case 'Android':
					state[0].isRefreshing = action.isRefreshing
					break;
				case 'iOS':
					state[1].isRefreshing = action.isRefreshing
					break;
				default:
					state[2].isRefreshing = action.isRefreshing
			}
			return Object.assign({}, state);
		break;
		case types.RECEIVE_ARTICLE_LIST:
			switch (action.category) {
				case 'Android':
					state[0].isRefreshing = action.isRefreshing;
					state[0].articleList = action.rankList.results;
					state[0].isFirstLoaded = false;
					break;
				case 'iOS':
					state[1].isRefreshing = action.isRefreshing;
					state[1].articleList = action.rankList.results;
					state[1].isFirstLoaded = false;
					break;
				default:
					state[2].isRefreshing = action.isRefreshing;
					state[2].articleList = action.rankList.results;
					state[2].isFirstLoaded = false;
			}
			return Object.assign({}, state);
		break;
		case types.RECEIVE_ARTICLE_LIST_MORE:
			switch (action.category) {
				case 'Android':
					state[0].isRefreshing = action.isRefreshing;
					state[0].articleList = state[0].articleList.concat(action.rankList.results);
					state[0].index = state[0].index + 1;
					break;
				case 'iOS':
					state[1].isRefreshing = action.isRefreshing;
					state[1].articleList = state[1].articleList.concat(action.rankList.results);
					state[1].index = state[0].index + 1;
					break;
				default:
					state[2].isRefreshing = action.isRefreshing;
					state[2].articleList = state[2].articleList.concat(action.rankList.results);
					state[2].index = state[0].index + 1;
			}
			return Object.assign({}, state);
		break;
		default:
			return state;
	}
}

function combine(state, action) {
	state.articleList[action.typeId] = action.articleList
	return state.articleList;
}

function loadMore(state, action) {
	state.articleList[action.typeId] = state.articleList[action.typeId].concat(action.articleList)
	return state.articleList;
}
