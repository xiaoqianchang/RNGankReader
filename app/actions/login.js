import * as types from '../constants/ActionTypes';
import * as Errors from '../constants/NetErrors';

var ResponseCallBack = new Interface('ResponseCallBack', ['onSuccess', 'onError']);

function doLogin(phone, password) {
    return dispatch => {
        let URL = 'http://172.16.101.201:9006/user/login';
        console.log("POST Sending request " + URL + " HTTP/1.1");
        fetch(URL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'sid=&rid=4&deviceid=D14448888832484539&marketid=colorfulfund&version=1.3.0&loginName=' + phone + '&password=' + password
        })
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData);
            // 解析 code 各个情况
            var code = responseData.code;
            switch (code) {
                case Errors.SUCCESS:
                    dispatch({
                        type: types.RECEIVE_LOGIN,
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

module.exports = {
    doLogin
};