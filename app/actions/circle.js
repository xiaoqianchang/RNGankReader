import * as types from '../constants/ActionTypes';

/**
 * 获取圈子列表
 */
export function fetchPosts(index = 1, isLoadMore) {
    return dispatch => {
        if (!isLoadMore) {
            dispatch(fetchPostList());
        }
        let URL = 'http://172.16.101.202/play/circle/getPostList4C';
        console.log(URL);
        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'sid=""&rid=4&deviceid=D14448888832484539&marketid=colorfulfund&version=1.3.0&boardId=1&pageNumber='+index
        })
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData);
            if (!isLoadMore) {
                dispatch(receivePostList(responseData));
            } else {
                dispatch(receivePostListMore(responseData));
            }
        })
        .catch((error) => {
            console.error(error);
        })
        .done();
    };
}

function fetchPostList() {
    return {
        type: types.FETCH_CIRCLE_LIST,
        isRefreshing: true
    };
}

function receivePostList(responseData) {
    return {
        type: types.RECEIVE_CIRCLE_LIST,
        isRefreshing: false,
        responseData: responseData
    }
}

function receivePostListMore(responseData) {
    return {
        type: types.RECEIVE_CIRCLE_LIST_MORE,
        isRefreshing: false,
        responseData: responseData
    }
}