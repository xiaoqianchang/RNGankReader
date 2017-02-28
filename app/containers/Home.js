import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  DrawerLayoutAndroid,
  TouchableHighlight,
  Dimensions,
  ScrollView,
  RefreshControl,
  BackAndroid,
  Platform,
  Image,
  View,
  ToastAndroid
} from 'react-native';
import {connect} from 'react-redux';
import Drawer from 'react-native-drawer'
import ScrollableTabView  from 'react-native-scrollable-tab-view';
// import ArticleList from './ArticleList';
// import AboutCmp from './AboutCmp';
// import BeautyCmp from './BeautyCmp';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isRefreshing: false,
      isDrawerOpen: false
    };
    this.navigator = this.props.navigator;
  }
  
  componentDidMount() {
    if (Platform.OS === 'ios') {

    } else {
      BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'ios') {

    } else {
      BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
    }
  }

  // Android平台返回键处理返回栈
  onBackAndroid() {
    const {navigator} = this.props;
    // 获取当前栈里的路由，也就是push进来，没有pop掉的那些。
    const routers = navigator.getCurrentRoutes();
    if (routers.length > 1) {
      navigator.pop();
      return true;
    }
    console.log('Drawer状态：' + this.state.isDrawerOpen)
    // 判断Drawer是否已打开
    if (this.state.isDrawerOpen) {
      this.closeDrawer();
      return true;
    }
    // 注意：这里的this一定要有，不然报错(Can not find variable: lastBackPressed)
    if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      // 最近2秒内按过back键，可以退出应用。
      return false;
    }
    this.lastBackPressed = Date.now();
    ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
    return true;
  };

  /**
   * 打开Drawer
   */
  openDrawer() {
    if (Platform.OS === 'ios') {
      this.refs.drawer.open()
    } else {
      this.refs.drawer.openDrawer()
    }
  }

  /**
   * 关闭Drawer
   */
  closeDrawer() {
    if (Platform.OS === 'ios') {
      this.refs.drawer.close()
    } else {
      this.refs.drawer.closeDrawer()
    }
  }

  _onHomeClick() {
    this.closeDrawer()
  }

  _onMenuClick() {
    this.openDrawer()
  }

  _onAboutClick(props){
    this.closeDrawer()
    if(props.navigator) {
        props.navigator.push({
            name: 'AboutCmp',
            // component: AboutCmp
        })
    }
  }

  _onBeautyClick(props){
    this.closeDrawer()
    if(props.navigator) {
        props.navigator.push({
            name: 'BeautyCmp',
            // component: BeautyCmp
        })
    }
  }

  render() {
    const { navigator } = this.props;
    let navigationView = (
      <View style = {styles.container}>
        <Image style = {styles.headerImage} source = {require('../../images/bg_drawer_header.png')} >
          <Text  style = {styles.titleText}>技术干货&&福利</Text>
        </Image>
        <TouchableHighlight underlayColor = "rgba(34, 26, 38, 0.1)" onPress={() => this._onHomeClick()}>
          <View style = {styles.item}>
            <Image style = {styles.iconHomeImage} source = {require('../../images/icon_home.png')}>
            </Image>
            <Text style = {styles.itemText}>首页</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style = {{marginTop: 10}} underlayColor = "rgba(34, 26, 38, 0.1)" onPress={() => this._onBeautyClick(this.props)}>
          <View style = {styles.item}>
            <Image style = {styles.iconHomeImage} source = {require('../../images/icon_beautiful.png')}></Image>
            <Text style = {styles.itemText}>福利</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style = {{marginTop: 10}} underlayColor = "rgba(34, 26, 38, 0.1)" onPress={() => this._onAboutClick(this.props)}>
          <View style = {styles.item}>
            <Image style = {styles.iconHomeImage} source = {require('../../images/icon_about.png')}></Image>
            <Text style = {styles.itemText}>关于</Text>
          </View>
        </TouchableHighlight>
      </View>
    );

    if (Platform.OS === 'ios') {
      return (
        <Drawer
          ref="drawer"
          type="overlay"
          tapToClose={true}
          openDrawerOffset={0.2}
          tweenHandler={(ratio) => ({main: { opacity:(2-ratio)/2 }})}
          content={navigationView}>
          <View style = {{flex: 1}}>
            <View style = {styles.headerBar}>
              <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)" onPress={()=>this._onMenuClick()}>
                <Image style = {styles.iconImage} source = {require('../../images/ic_menu.png')}></Image>
              </TouchableHighlight>
              <Text style = {styles.headerText}>干货分享</Text>
            </View>
            <ScrollableTabView style = {{flex: 1}} tabBarUnderlineColor = "white"
                               tabBarInactiveTextColor = "#F2F2F2" tabBarBackgroundColor = "#27B5EE" tabBarActiveTextColor = "white">
              {/*<ArticleList category = 'Android' tabLabel = "安卓" {...this.props}></ArticleList>
              <ArticleList category = 'iOS' tabLabel = "苹果" {...this.props}></ArticleList>
              <ArticleList category = '拓展资源' tabLabel = "拓展" {...this.props}></ArticleList>*/}
            </ScrollableTabView>
          </View>
        </Drawer>
      );
    }else{
      return (
        // DrawerLayoutAndroid的直接子视图会成为主视图（用于放置你的内容）。
        <DrawerLayoutAndroid
          ref="drawer"
          // 指定抽屉的宽度，也就是从屏幕边缘拖进的视图的宽度。
          drawerWidth = {width*0.8}
          // 指定抽屉可以从屏幕的哪一边滑入。
          drawerPosition = {DrawerLayoutAndroid.positions.Left}
          onDrawerOpen = {() => this.setState({isDrawerOpen: true})}
          onDrawerClose = {() => this.setState({isDrawerOpen: false})}
          // 此方法用于渲染一个可以从屏幕一边拖入的导航视图。
          renderNavigationView = {() => navigationView}>
          <View style = {{flex: 1}}>
            <View style = {styles.headerBar}>
              <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)" onPress={() =>this._onMenuClick()}>
                <Image style = {styles.iconImage} source = {require('../../images/ic_menu.png')}></Image>
              </TouchableHighlight>
              <Text style = {styles.headerText}>干货分享</Text>
            </View>
            {/*<ScrollableTabView style = {{flex: 1}} tabBarUnderlineColor = "white"
              tabBarInactiveTextColor = "#F2F2F2" tabBarBackgroundColor = "#27B5EE" tabBarActiveTextColor = "white">
              <ArticleList category = 'Android' tabLabel = "安卓" {...this.props}></ArticleList>
              <ArticleList category = 'iOS' tabLabel = "苹果" {...this.props}></ArticleList>
              <ArticleList category = '拓展资源' tabLabel = "拓展" {...this.props}></ArticleList>
            </ScrollableTabView>*/}
          </View>
        </DrawerLayoutAndroid>
      );
    }
  }
}

let {height, width} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  headerImage: {
    height: height/5,
    width: width*0.8,
    backgroundColor: '#27B5EE',
    marginBottom: 20
  },
  item: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(34, 26, 38, 0.1)'
  },
  iconHomeImage: {
    height: 30,
    margin: 8,
    width: 30
  },
  itemText: {
    marginLeft: 6,
    fontWeight: 'bold',
    fontSize: 16
  },
  iconImage: {
    height: 30,
    margin: 4,
    width: 30
  },
  headerBar: {
    backgroundColor: '#27B5EE',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },
  headerText: {
    fontSize: 22,
    color: 'white',
    marginLeft: 10
  },
  titleText: {
    color:'white',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'transparent',
    margin: 50,
  },
});

function mapStateToProps(state) {
  const {read} = state;
  return {
    read
  }
}
export default connect(mapStateToProps)(Home);