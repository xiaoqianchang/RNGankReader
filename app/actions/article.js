import * as types from '../constants/ActionTypes';

/**
 * 获取文章列表
 */
export function fetchArticles(category = 'Android', index = 1, isLoadMore, nowRead) {
	return dispatch => {
		if (!isLoadMore) {
			dispatch(fetchArticleList(category));
		}
		let URL = `http://gank.io/api/data/${category}/10/${index}`;
		console.log(URL);
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
			  console.log('error');
		  }).done();
	}
}

/**
 * 获取网络数据例子方法
 */
export function fetchArticlesDemo() {
	return dispatch => {
		let URL = 'http://file.midasjr.com/play/user/login';
		console.log(URL);
		// 获取网络数据
		fetch(URL, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: 'phone=15601815671&password=123123&sid=""&rid=4&deviceid=D14448888832484539'
		})
		.then((response) => response.text())
		.then((responseText) => {
			// 获取到数据bean对象
			var back = JSON.parse(responseText);
			// 更新状态
			this.setState({sid: back.sid, pla: back.msg});
		})
		.catch((error) => {
			console.log(error);
		})
		.done();
	}
}

function fetchArticleList(category) {
	return {
		type: types.FETCH_ARTICLE_LIST,
		category: category,
		isRefreshing: true
	}
}

function receiveArticleList(rankList, category) {
	return {
		type: types.RECEIVE_ARTICLE_LIST,
		isRefreshing: false,
		category: category,
		rankList: rankList
	}
}

function receiveArticleListMore(rankList, category, nowRead) {
	return {
		type: types.RECEIVE_ARTICLE_LIST_MORE,
		isRefreshing: false,
		category: category,
		nowRead : nowRead,
		rankList: rankList
	}
}
