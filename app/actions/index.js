/**
 * action 的集合
 */
import articleActions from './article';
import beautyActions from './beauty';
import circleActions from './circle';

// 通过 ... 的形式导出 action 集合，在需要导入的 js 文件中（包含需要多个 action 方法）只需要 import 当前的 action 集合就行，避免多次从某 action 文件 import 不同的方法。
module.exports = {
    ...articleActions, // ... 代表 articleActions 里面有大于两个 export 方法
    ...beautyActions,
    ...circleActions
};