import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    ListView,
    RefreshControl,
    TouchableHighlight,
    InteractionManager,
    ActivityIndicator,
    Animated,
    Platform,
    View,
    Image,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/circle';
import CircleDetail from './CircleDetail';

const host = 'http://172.16.101.201:9006';

class CircleList extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
    }

    componentWillMount() {
        InteractionManager.runAfterInteractions(() => {
            this.fetchPosts();
        });
    }

    render() {
        const {dispatch, circle} = this.props;
        // 第一次加载是否完成
        let isFirstLoaded = circle.articleList.length != 0;

        return (
            <ListView
                enableEmptySections = {true}
                style = {styles.container}
                renderFooter = {this._renderFooter.bind(this, isFirstLoaded)}
                onEndReachedThreshold = {10}
                onEndReached = {this._onEndReached.bind(this, dispatch, circle)}
                dataSource = {this.dataSource.cloneWithRows(circle.articleList)}
                renderRow = {this._renderRow.bind(this)}
                initialListSize = {10}
                pageSize = {circle.articleList.length}
                refreshControl = {
                    <RefreshControl
                        refreshing = {circle.isRefreshing}
                        onRefresh = {this._onRefresh.bind(this)}
                        colors = {['#ff0000', '#00ff00', '#0000ff','#3ad564']}
                        progressBackgroundColor = {'#ffffff'} />
                } />
        );
    }

    /**
     * Refresh
     */
    _onRefresh() {
        this.fetchPosts();
    }

    /**
     * 获取文章列表数据
     */
    fetchPosts() {
        const {dispatch, category} = this.props;
        dispatch(fetchPosts());
    }

    /**
     * 渲染列表的每一个item
     */
    _renderRow(rowData, sectionId, rowId, highLightRow) {
        return (
            <TouchableHighlight underlayColor = "rgba(34, 26, 38, 0.1)" onPress = {() => this._onItemClick(rowData, rowId)}>
                <View style = {{flexDirection: 'column', padding: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#c9c9c9'}}>
                    <View style = {{flex: 1}}>
                        <Image style = {styles.coverImgURL} source = {{uri: 'http://baijunjian.keliren.cn/tuku/a/20160429/572241b88772e.jpg'}} />
                        <Text style = {{fontSize: 16, marginTop: 10, color: '#2e2e2e'}}>{rowData.title}</Text>
                        <View style = {{flexDirection: 'row', marginTop: 16, justifyContent: 'space-between'}}>
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                <Animated.Image style = {styles.photoURL} source = {{uri: 'http://img17.3lian.com/d/file/201701/16/025b50f73ff9ed42f5616c689da0dfd7.jpg'}} />
                                <Text style = {styles.publisher}>{rowData.authorInfo.nickName}</Text>
                                <Text style = {styles.publishDate}>{this._formatData(rowData.postTime)}</Text>
                            </View>
                            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                                <Image style = {{width: 14, height: 14, resizeMode: 'contain'}} source = {require('../../images/icon_like.png')} />
                                <Text style = {{paddingLeft: 6, color: '#666', fontSize: 12}}>{rowData.thumbNumber}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    /**
     * http://172.16.101.201:9006
     */
    _getHost() {
        if (host.lastIndexOf('/') != 0) {
            return host + '/';
        }
    }

    /**
     * item 点击跳转处理
     */
    _onItemClick(rowData, rowId) {
        const {navigator, circle, dispatch} = this.props;
        if (navigator) {
            navigator.push({
                name: 'CircleDetail',
                component: CircleDetail,
                params: {
                    rowData,
                    circle,
                    dispatch
                }
            });
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
     * Footer
     */
    _renderFooter(isFirstLoaded) {
        if (!isFirstLoaded) {
            return;
        }
        if (1) {
            if (Platform.OS === 'ios') {
                return (
                    <View style = {styles.progress}></View>
                );
            } else {
                return (
                    <View style = {styles.progress}>
                        <ActivityIndicator size = {'large'} />
                    </View>
                );
            }
        } else {
            return (
                <View style = {styles.progress}>
                    <Text style = {{color: 'rgba(0, 0, 0, 0.3)'}}>数据已经加载完了- -|||</Text>
                </View>
            );
        }
    }

    _onEndReached(dispatch, circle) {
        // 避免第一次进来下拉和上拉都各自执行一次
        if (typeof(circle) == 'undefined' || circle.isFirstLoad) {
            return;
        }
        InteractionManager.runAfterInteractions(() => {
            dispatch(fetchPosts(circle.index + 1, true));
        });
    }
}

let {width, height} = Dimensions.get('window');
var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    progress: {
        marginVertical: 20,
        alignSelf: 'center'
    },
    coverImgURL: {
        height: 200,
        borderRadius: 6,
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
    }
});

function mapStateToProps(state) {
  const {circle} = state;
  return {
      circle
  }
}

export default connect(mapStateToProps)(CircleList);