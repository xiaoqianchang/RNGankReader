import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    ProgressBarAndroid,
    TouchableOpacity,
    Dimensions,
    View,
    Text,
    Image,
    WebView,
    ScrollView,
    Animated,
    Easing
} from 'react-native';

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
        Animated.timing(this.state.progressValue, {
            toValue: width * 0.8,
            duration: 1500,
            easing: Easing.linear
        }).start();
    }

    render() {
        const {rowData, navigator} = this.props;
        return (
            <View style = {{flex: 1}}>
                <View style = {styles.headerBar}>
                    <TouchableHighlight underlayColor = "rgba(34, 26, 38, 0.1)" onPress = {() => this._onBackClick(navigator)}>
                        <Image style = {styles.iconImage} source = {require('../../images/icon_back.png')} />
                    </TouchableHighlight>
                    <Text style = {styles.headerText}>{rowData.desc}</Text>
                </View>
                <Animated.View style = {{width: this.state.progressValue, height: 2, backgroundColor: '#27B5EE'}} />
                <WebView
                    ref = 'webview'
                    style = {{flex: 1}}
                    source = {{uri: rowData.url}}
                    onNavigationStateChange = {(navState) => this._onNavigationStateChange(navState)}
                    onLoadEnd = {() => this._onLoadEnd()}
                    renderLoading = {() => this._renderLoading()} />
            </View>
        );
    }

    /**
     * 返回处理事件
     */
    _onBackClick(navigator) {
        if (this.state.isCanBack) {
            this.refs.webview.goBack();
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

    _onLoadEnd() {
        this.setState({
            progressValue: width
        });
    }

    _renderLoading() {
        console.log('_renderLoading');
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