import * as types from '../constants/ActionTypes';
import * as Errors from '../constants/NetErrors';

/**
 * 获取圈子列表
 */
function fetchPosts(index = 1, isLoadMore) {
    return dispatch => {
        if (!isLoadMore) {
            dispatch(fetchPostList());
        }
        let URL = 'http://172.16.101.202/play/circle/getPostList4C';
        console.log("POST Sending request " + URL + " HTTP/1.1");
        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'sid=&rid=4&deviceid=D14448888832484539&marketid=colorfulfund&version=1.3.0&boardId=1&pageNumber=' + index
        })
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData);
            // responseData = JSON.parse(responseData);
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

/**
 * 获取帖子详情
 * @param {*} params 
 */
function fetchPostInfo(postId, tagId) {
    return dispatch => {
        let URL = 'http://172.16.101.202/play/circle/getPostInfo4C';
        console.log("POST Sending request " + URL + " HTTP/1.1");
        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'sid=&rid=4&deviceid=D14448888832484539&marketid=colorfulfund&version=1.3.0&postId=' + postId + '&tagId=' + tagId
        })
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData);
            // responseData = JSON.parse(responseData);
            dispatch({
                type: types.RECEIVE_CIRCLE_POST_INFO,
                responseData: responseData
            });
        })
        .catch((error) => {
            console.error(error);
        })
        .done();
    };
}

/**
 * 收藏
 * @param {*} postId 发布帖子id
 */
function doCollection(postId) {
    return dispatch => {
        let URL = 'http://172.16.101.201:9006/circle/createCollection';
        console.log("POST Sending request " + URL + " HTTP/1.1");
        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'sid=&rid=4&deviceid=D14448888832484539&marketid=colorfulfund&version=1.3.0&postId=' + postId
        })
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData);
            // 解析 code 各个情况
            var code = responseData.code;
            switch (code) {
                case Errors.SUCCESS:
                    dispatch({
                        type: types.RECEIVE_CIRCLE_POST_COLLECTION,
                        responseData: responseData
                    });
                    break;
                case Errors.ERROR:
                    break;
                case Errors.SESSION_TIMEOUT:
                    break;
                case Errors.JSON_EXCEPTION:
                    break;
                default:
                    break;
            }
        })
        .catch((error) => {
            console.error(error);
        })
        .done();
    }
}

/**
 * 点赞
 * @param {*} postId 发布帖子id
 */
function doPraise(postId) {
    return dispatch => {
        let URL = 'http://172.16.101.201:9006/circle/createThumb';
        console.log("POST Sending request " + URL + " HTTP/1.1");
        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'sid=&rid=4&deviceid=D14448888832484539&marketid=colorfulfund&version=1.3.0&postId=' + postId
        })
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData);
            dispatch({
                type: types.RECEIVE_CIRCLE_POST_PRAISE,
                responseData: responseData
            });
        })
        .catch((error) => {
            console.error(error);
        })
        .done();
    }
}

module.exports = {
    fetchPosts,
    fetchPostInfo,
    doCollection,
    doPraise
};