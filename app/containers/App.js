/**
 * Navigator 的用法，包括跳转、 params 传值与回传值
 * http://reactnative.cn/post/20
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Navigator,
  View
} from 'react-native';

import Home from './Home';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    let name = 'Home';
    let home = Home;
    return (
      <Navigator
        // 定义启动时加载的路由。路由是导航栏用来识别渲染场景的一个对象。initialRoute必须是initialRouteStack中的一个路由。initialRoute默认为initialRouteStack中最后一项。
        initialRoute = {{ name: name, component: home }}
        // 可选的函数，用来配置场景动画和手势，返回一个场景配置对象---页面之间跳转时候的动画
        configureScene = {(route, routeStack) => {
          return Navigator.SceneConfigs.FloatFromRight;
          {/*return Navigator.SceneConfigs.VerticalDownSwipeJump;*/}
        }}
        renderScene = {(route, navigator) => {
          let Component = route.component;
          /**
           * 这是一个会被 render 出来给用户看到的 component ，然后 navigator 作为 props 传递给了这个 component。
           * 这里有个 { ...route.params } 这个语法是把 routes.params 里的每个 key 作为 props 的一个属性: 在下一个界面通过 
           * navigator.push({
           *    name: 'SecondPageComponent',
           *    component: SecondPageComponent,
           *    params: {
           *      id: this.state.id
           *    }
           *  });
           * 中的 params 中的 key 、 value 的形式吧参数传入到下一个界面。
           */
          return <Component {...route.params} navigator = {navigator} />
        }} />
    );
  }
}

module.exports = App;
// export{ App as default };