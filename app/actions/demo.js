import * as types from '../constants/ActionTypes'

/**
 * 获取网络数据例子方法
 */
export function fetchArticlesDemo1() {
	return dispatch => {
		let URL = 'http://file.midasjr.com/play/user/login';
		console.log(URL);
		// 异步分发原味 action
		fetch(URL, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: 'phone=15601815671&password=123123&sid=""&rid=4&deviceid=D14448888832484539'
		})
		.then((response) => response.json())
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

export function fetchArticlesDemo2() {
	return dispatch => {
		let URL = 'http://file.midasjr.com/play/user/login';
		console.log(URL);
		// 异步分发原味 action
		fetch(URL)
		.then((response) => dispatch(fetchSuccess(response)), error => dispatch(fetchFail(error)));
	}
}

function fetchSuccess(response) {
	return {
		type: types.FETCH_ARTICLE_LIST,
		category: category,
		isRefreshing: false
	}
}

function fetchFail(error) {
	return {
		type: types.FETCH_ARTICLE_LIST,
		category: category,
		isRefreshing: false
	}
}