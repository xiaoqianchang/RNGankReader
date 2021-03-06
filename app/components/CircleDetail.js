import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    InteractionManager,
    TouchableOpacity,
    Animated,
    ScrollView,
    View,
    Text,
    Image,
    WebView
} from 'react-native';
import { connect } from 'react-redux';
/**
 * https://github.com/lelandrichardson/react-native-parallax-view
 * npm install react-native-parallax-view --save
 * 安装后
 * react-native-parallax-view@2.0.6对react-native-scrollable-mixin@1.0.1有依赖。
 */
import ParallaxView from 'react-native-parallax-view';
import { fetchPostInfo, doCollection, doPraise } from '../actions/circle';

const host = 'http://172.16.101.202';

class CircleDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        const { navigator } = this.props;
    }

    componentWillMount() {
        InteractionManager.runAfterInteractions(() => {
            this.fetchPostInfo();
        });
    }

    render() {
        // 这里的 circle 、 dispatch 不能从上个界面传过来，否则 circle 里面的 articleInfo 等有延迟现象（当前界面 articleInfo 等的数据是上一个请求的数据）
        // this._getHost() + articleInfo.contentHtml
        const { circle, navigator } = this.props;
        const { articleInfo, referList, thumbStatus, collectionStatus } = circle;
        console.log("webView加载的url：" + this._getHost() + articleInfo.contentHtml);
        return (
            <View style = {{flex: 1}}>
                {/*<ParallaxView 
                    ref = {(component) => this._scrollView = component}
                    backgroundSource = {{uri: 'http://baijunjian.keliren.cn/tuku/a/20160429/572241b88772e.jpg'}}
                    windowHeight = {200}
                    // header = {HEADER}
                    scrollableViewStyle = {{backgroundColor: 'white'}}>
                    <View style = {{flex: 1, padding: 12}}>
                        <Text style = {{fontSize: 16, marginTop: 10, color: '#2e2e2e'}}>{articleInfo.title}</Text>
                        <View style = {{flexDirection: 'row', marginTop: 16, justifyContent: 'space-between'}}>
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                <Animated.Image style = {styles.photoURL} source = {{uri: 'http://img17.3lian.com/d/file/201701/16/025b50f73ff9ed42f5616c689da0dfd7.jpg'}} />
                                <Text style = {styles.publisher}>{articleInfo.authorInfo.nickName}</Text>
                                <Text style = {styles.publishDate}>{this._formatData(articleInfo.postTime)}</Text>
                            </View>
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                <Image style = {{width: 14, height: 14, resizeMode: 'contain'}} source = {require('../../images/icon_like.png')} />
                                <Text style = {{paddingLeft: 6, color: '#666', fontSize: 12}}>{articleInfo.thumbNumber}</Text>
                            </View>
                        </View>
                        <WebView
                            ref = {(component) => this._webView = component}
                            style = {{flex: 1, height: 200}}
                            source = {{uri: 'https://zhuanlan.zhihu.com/p/25597082'}} />
                        <TouchableOpacity onPress={() => {this._scrollView.scrollTo({x: 0, y: 0, animated: true});}}>
                            <Text style={{color: '#00A7FF'}}>
                                Scroll to top
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ParallaxView>*/}
                <ScrollView>
                    <View style = {{flex: 1}}>
                        <Image style = {styles.coverImgURL} source = {{uri: 'http://baijunjian.keliren.cn/tuku/a/20160429/572241b88772e.jpg'}} />
                        <View style = {{padding: 12}}>
                            <Text style = {{fontSize: 16, marginTop: 10, color: '#2e2e2e'}}>{articleInfo.title}</Text>
                            <View style = {{flexDirection: 'row', marginTop: 16, justifyContent: 'space-between'}}>
                                <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                    <Animated.Image style = {styles.photoURL} source = {{uri: 'http://img17.3lian.com/d/file/201701/16/025b50f73ff9ed42f5616c689da0dfd7.jpg'}} />
                                    <Text style = {styles.publisher}>{articleInfo.authorInfo.nickName}</Text>
                                    <Text style = {styles.publishDate}>{this._formatData(articleInfo.postTime)}</Text>
                                </View>
                                <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                    <Image style = {{width: 14, height: 14, resizeMode: 'contain'}} source = {require('../../images/icon_like.png')} />
                                    <Text style = {{paddingLeft: 6, color: '#666', fontSize: 12}}>{articleInfo.thumbNumber}</Text>
                                </View>
                            </View>
                        </View>
                        <WebView
                            ref = {(component) => this._webView = component}
                            style = {{flex: 1, height: 200}}
                            source = {{uri: this._getHost() + articleInfo.contentHtml}} />
                    </View>
                </ScrollView>
                <View style = {styles.bottomContainer}>
                    <TouchableOpacity onPress = {() => this._onBack()}>
                        <Image style = {styles.bottomButtonIcon} source = {require('../../images/circle/btn_back.png')} />
                    </TouchableOpacity>
                    <View style = {styles.bottomContainerRight}>
                        <TouchableOpacity style = {{marginRight: 10}} onPress = {() => this._onCollection()}>
                            <Image style = {styles.bottomButtonIcon} source = {circle.collectionStatus ? require('../../images/circle/icon_collection_selected.png') : require('../../images/circle/icon_collection_normal.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style = {{marginRight: 10}} onPress = {() => this._onPraise()}>
                            <Image style = {styles.bottomButtonIcon} source = {circle.thumbStatus ? require('../../images/circle/icon_praise_selected.png') : require('../../images/circle/icon_praise_normal.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style = {{marginRight: 10}} onPress = {() => this._onShare()}>
                            <Image style = {styles.bottomButtonIcon} source = {require('../../images/circle/icon_share.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style = {{marginRight: 10}} onPress = {() => this._onComment()}>
                            <Image style = {styles.bottomButtonIcon} source = {require('../../images/circle/comment.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    /**
     * 返回
     */
    _onBack() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    /**
     * 收藏
     */
    _onCollection() {
        const { dispatch } = this.props;
        dispatch(doCollection());
    }

    /**
     * 点赞
     */
    _onPraise() {
        const { dispatch } = this.props;
        dispatch(doPraise());
    }

    /**
     * 分享
     */
    _onShare() {

    }

    /**
     * 评论
     */
    _onComment() {

    }

    /**
     * http://172.16.101.202:9006
     */
    _getHost() {
        if (host.lastIndexOf('/') != 0) {
            return host + '/';
        }
    }

    /**
     * 格式化日期
     */
    _formatData(strTime) {
        var date = new Date();
        return date.getFullYear() + "-" + (date.getMonth() + 1) +"-" + date.getDate();
    }

    /**
     * 获取文章详情
     */
    fetchPostInfo() {
        var { dispatch, rowData } = this.props;
        dispatch(fetchPostInfo(rowData.postId, rowData.tagList[0].tagId));
    }
}

let { width, height } = Dimensions.get('window');
var styles = StyleSheet.create({
    coverImgURL: {
        height: 200,
        resizeMode: 'cover'
    },
    photoURL: {
        width: 24,
        height: 24,
        borderRadius: 12,
        // 设置图片填充模式
        resizeMode: 'cover'
    },
    publisher: {
        marginLeft: 10, 
        color: '#bdbdbd', 
        fontSize: 12
    },
    publishDate: {
        marginLeft: 13,
        color: '#bdbdbd', 
        fontSize: 12
    },
    bottomContainer: {
        flexDirection: 'row',
        backgroundColor: '#e9eaed',
        height: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: width,
        // borderTopWidth: 1,
        // borderTopColor: '#FFCCCC',
        overflow: 'visible', // hidden
    },
    bottomContainerRight: {
        flexDirection: 'row',
    },
    bottomButtonIcon: {
        width: 24,
        height: 24,
        margin: 10,
        resizeMode: 'contain'
    }
});

var HEADER = (
    <Text style = {{fontSize: 16, color: 'black'}}>Header Content</Text>
);

function mapStateToProps(state) {
  const { circle } = state;
  return {
      circle
  }
}

export default connect(mapStateToProps)(CircleDetail);