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
        }}
        renderScene = {(route, navigator) => {
          let Component = route.component;
          return <Component {...route.params} navigator = {navigator} />
        }} />
    );
  }
}

module.exports = App;
// export{ App as default };