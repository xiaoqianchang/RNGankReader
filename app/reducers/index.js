/**
 * 原由：
 * 当项目中存在越来越多的 action.type 时， 主 Reducer 将变得越来越大，越来越多的 case 将导致代码不够清晰。
 * 所以在代码组织上，通常会将 Reducer 拆分成一个个小的 Reducer （然后通过combineReducers()这个函数，将几个Reducer组合起来）
 * ，每个 Reducer 分别处理 state 中的一部分数据，
 * 最终将处理后的数据合并成为整个 state。（才有这个文件）
 * 
 * 在 Redux 中，一个 action 可以触发多个 reducer，一个 reducer 中也可以包含多种 action.type 的处理。属于多对多的关系。
 */

import {combineReducers} from 'redux';
import read from './read';
import beautyReducers from  './beautyReducers';

/**
 * rootReducer 为根 Reducer
 * rootReducer 将不同部分的 state 传给对应的 reducer 处理，最终合并所有 Reducer 的返回值，组成整个state。
 */
const rootReducer = combineReducers({
	read,
	beautyReducers
})

export default rootReducer;
