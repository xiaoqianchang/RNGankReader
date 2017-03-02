/**
 * Store:
 * 在 Redux 项目中，Store 是单一的。维护着一个全局的 State，并且根据 Action 来进行事件分发处理 State。
 * (可以看出 Store 是一个把 Action 和 Reducer 结合起来的对象。)
 * 
 * api：
 * Redux 提供了 createStore() 方法来生产 Store，并提供三个 API，如
 * var store = createStore(rootReducer);  //rootReducer 为根 Reducer
 * 1. store.getState()用来获取 state 数据。
 * 2. store.subscribe(listener) 用于注册监听函数。每当 state 数据更新时，将会触发监听函数。
 * 3. store.dispatch(action)是用于将一个 action 对象发送给 reducer 进行处理。
 * 
 * Redux-thunk：
 * Redux 中使用 Redux-thunk 做异步操作(Async Actions)。
 * 首先理解一下”中间件（middleware）”的概念。
 * 
 * 每当一个 action（或者其他诸如异步 action creator 中的某个函数）被分发时，中间件就会被调用，并且在需要的时候协助 action creator 分发真正的 action。
 * 
 * 异步 action creator 提供的中间件叫 thunk middleware 即Redux-thunk这个库干的事儿。
 * 
 * 为了让 Redux 知道我们有一个或多个中间件，我们使用 Redux 的辅助函数：applyMiddleware。
 * applyMiddleware 接收所有中间件作为参数，返回一个供 Redux createStore 调用的函数。
 * 当最后这个函数被调用时，它会产生一个 Store 增强器，用来将所有中间件应用到 Store 的 dispatch 上。
 * 
 * 下面就是如何将一个中间件应用到 Redux store：
 */

import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers/index';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default function configureStore(initialState) {
	const store = createStoreWithMiddleware(rootReducer, initialState);

	return store;
}