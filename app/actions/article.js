/**
 * Action Creators：
 * 另一个约定俗成的做法是通过创建函数（fetchArticles）生成 action 对象，而不是在你 dispatch 的时候内联生成它们。
 */

import * as types from '../constants/ActionTypes';

/**
 * 获取文章列表
 */
export function fetchArticles(category = 'Android', index = 1, isLoadMore, nowRead) {
	return dispatch => {
		if (!isLoadMore) {
			dispatch(fetchArticleList(category));
		}
		/**
		 * 所有干货，支持配图数据返回。
		 * http://gank.io/api/data/数据类型/请求个数/第几页
		 */
		let URL = `http://gank.io/api/data/${category}/10/${index}`;
		console.log("POST Sending request " + URL + " HTTP/1.1");
    	fetch(URL)
		.then(response => response.json())
      	.then(responseData => {
			  console.log(responseData);
			  if (!isLoadMore) {
				  dispatch(receiveArticleList(responseData, category));
			  } else {
				  dispatch(receiveArticleListMore(responseData, category, nowRead));
			  }
      	}).catch((error) => {
			  console.log(error);
			  console.error(error);
		  }).done();
	}
}

/**
 * 直到返回了包含type的字面量对象，这个异步操作就算完成了。
 * @param {*} category 
 */
function fetchArticleList(category) {
	return {
		type: types.FETCH_ARTICLE_LIST,
		category: category,
		isRefreshing: true
	}
}

function receiveArticleList(responseData, category) {
	return {
		type: types.RECEIVE_ARTICLE_LIST,
		isRefreshing: false,
		category: category,
		responseData: responseData
	}
}

function receiveArticleListMore(responseData, category, nowRead) {
	return {
		type: types.RECEIVE_ARTICLE_LIST_MORE,
		isRefreshing: false,
		category: category,
		nowRead : nowRead,
		responseData: responseData
	}
}
