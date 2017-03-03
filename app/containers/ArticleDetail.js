import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    BackAndroid,
    Platform,
    View,
    Text,
    Image,
    WebView,
    ScrollView,
    Animated,
    Easing
} from 'react-native';

var WEBVIEW_REF = 'webview';

class ArticleDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCanBack: false,
            progressValue: new Animated.Value(0)
        };
        const {navigator} = this.props;
    }

    componentDidMount() {
        if (Platform.OS === 'ios') {

        } else {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
        }
        Animated.timing(this.state.progressValue, {
            toValue: width * 0.8,
            duration: 1500,
            easing: Easing.linear
        }).start();
    }

    componentWillUnmount() {
        if (Platform.OS === 'ios') {

        } else {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
        }
    }

    // Android 平台返回键处理返回栈
    onBackAndroid() {
        const {navigator} = this.props;
        this._onBackClick(navigator);
    }

    render() {
        const {rowData, navigator} = this.props;
        return (
            <View style = {{flex: 1}}>
                <View style = {styles.headerBar}>
                    <TouchableHighlight underlayColor = "rgba(34, 26, 38, 0.1)" onPress = {() => this._onBackClick(navigator)}>
                        <Image style = {styles.iconImage} source = {require('../../images/icon_back.png')} />
                    </TouchableHighlight>
                    <Text numberOfLines = {1} style = {styles.headerText}>{rowData.desc}</Text>
                </View>
                <Animated.View style = {{width: this.state.progressValue, height: 2, backgroundColor: '#27B5EE'}} />
                <WebView
                    ref = {WEBVIEW_REF}
                    style = {{flex: 1}}
                    source = {{uri: rowData.url}}
                    onNavigationStateChange = {(navState) => this._onNavigationStateChange(navState)}
                    // 允许为webview发起的请求运行一个自定义的处理函数。返回true或false表示是否要继续执行响应的请求。
                    onShouldStartLoadWithRequest = {(event) => this._onShouldStartLoadWithRequest(event)}
                    // 加载结束时（无论成功或失败）调用。
                    onLoadEnd = {() => this._onLoadEnd()}
                    // 设置一个函数，返回一个加载指示器。
                    renderLoading = {() => this._renderLoading()}
                    // 设置一个函数，返回一个视图用于显示错误。
                    // renderError = {this._renderError()}
                    // 强制WebView在第一次加载时先显示loading视图。默认为true。
                    startInLoadingState = {true} />
            </View>
        );
    }

    /**
     * 返回处理事件
     */
    _onBackClick(navigator) {
        if (this.state.isCanBack) {
            // 下面两种方法效果一样
            this.refs.webview.goBack();
            // this.refs[WEBVIEW_REF].goBack();
            return;
        }
        if (navigator) {
            navigator.pop();
        }
    }

    /**
     * WebView 加载状态变化
     */
    _onNavigationStateChange(navState) {
        this.setState({
            isCanBack: navState.canGoBack
        });
    }

    _onShouldStartLoadWithRequest(event) {
        // Implement any custom loading logic here, don't forget to return!
        return true;
    }

    _onLoadEnd() {
        this.setState({
            progressValue: width
        });
    }

    _renderLoading() {
        console.log('_renderLoading');
    }

    _renderError() {
        return (
            <View style = {{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style = {{fontSize: 20, fontWeight: 'bold', color: 'black'}}>加载错误，请重试...</Text>
            </View>
        );
    }
}

let {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    headerBar: {
        backgroundColor: '#27B5EE',
        flexDirection: 'row',
        // flexWrap: 'nowrap',
        alignItems: 'center',
        padding: 10
    },
    headerText: {
        fontSize: 20,
        color: 'white',
        marginLeft: 10
    },
    iconImage: {
        width: 30,
        height: 30,
        margin: 4
    },
});

module.exports = ArticleDetail;