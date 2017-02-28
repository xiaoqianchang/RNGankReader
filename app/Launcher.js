
import React, { Component } from 'react';
import {
    StyleSheet,
    Text
} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './store/configure-store';

import App from './containers/App';

const store = configureStore();

class Root extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

/**
 * 这里导出有四种写法, 其中Root为类名：
 * 1. 直接在class声明之前加上 export default, 如：export default class Root extends Component {}, 最后面不用加export配置;
 * 2. 类正常声明, 如：class Root extends Component {}, 在最后加上 export default Root;
 * 3. 类正常声明, 如：class Root extends Component {}, 在最后加上 export{ Root as default };
 * 4. 类正常声明, 如：class Root extends Component {}, 在最后加上 module.exports = Root;
 */
// 下面两种效果一样
// export default Root;
module.exports = Root;