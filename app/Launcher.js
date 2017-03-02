
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
            /**
             * Connect 组件需要 store。这个需求由 Redux 提供的另一个组件 Provider 来提供。
             * 源码中，Provider 继承了 React.Component，所以可以以 React 组件的形式来为 Provider 注
             * 入 store，从而使得其子组件能够在上下文中得到 store 对象。如
             */
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