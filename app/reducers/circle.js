import * as types from '../constants/ActionTypes';

const initialState = {
    isRefreshing: false,
	isFirstLoad: true, // 是否是第一次加载
	isLoadMore: false,
	noMore: false,
	index: 1,
	articleList: [], // 圈子列表

	// 圈子帖子详情
	articleInfo: {
		authorInfo: {} // 这里必须声明，不然 CircleDetail 里面 {articleInfo.authorInfo.nickName} 取值时报 Cannot read property 'nickName' of undefined （因为 articleInfo.authorInfo 找不到，在取 nickName 时报错）
	},
	referList: [],
	thumbStatus: false, // 该用户是否点过赞
	collectionStatus: false // 该用户是否收藏过
};

export default function circle(state = initialState, action) {
	switch (action.type) {
		case types.FETCH_CIRCLE_LIST:
			state.isRefreshing = action.isRefreshing;
			return Object.assign({}, state);
			break;
		case types.RECEIVE_CIRCLE_LIST:
			state.isRefreshing = action.isRefreshing;
			state.articleList = action.responseData.postListPerPage.postList;
			state.isFirstLoad = false;
			return Object.assign({}, state);
			break;
		case types.RECEIVE_CIRCLE_LIST_MORE:
			state.isRefreshing = action.isRefreshing;
			state.articleList = state.articleList.concat(action.responseData.postListPerPage.postList);
			state.index = state.index + 1;
			return Object.assign({}, state);
			break;
		case types.RECEIVE_CIRCLE_POST_INFO: // 获取帖子详情
			state.articleInfo = action.responseData.result.postInfo;
			state.referList = action.responseData.result.referList;
			state.thumbStatus = action.responseData.result.thumbStatus;
			state.collectionStatus = action.responseData.result.collectionStatus.collectionStatus;
			return Object.assign({}, state);
			break;
		default:
			return state;
	}
}