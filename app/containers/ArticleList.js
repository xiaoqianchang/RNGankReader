import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableHighlight,
    Dimensions,
    RefreshControl,
    ScrollView,
    ListView,
    InteractionManager,
    ProgressBarAndroid,
    Platform,
    Text,
    View,
    Image
} from 'react-native';
import {fetchArticles} from '../actions/article';
import ArticleDetail from './ArticleDetail';

class ArticleList extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
    }

    render() {
        const {dispatch, read, category} = this.props;
        let nowRead;
        switch (category) {
            case 'Android':
                nowRead = read[0];
                break;
            case 'ios':
                nowRead = read[1];
                break;
            default:
                nowRead = read[2];
                break;
        }
        let isFirstLoaded = nowRead.articleList.length != 0;

        return (
            <ListView
                enableEmptySections = {true}
                style = {{flex: 1}}
                // 页头与页脚会在每次渲染过程中都重新渲染（如果提供了这些属性）。如果它们重绘的性能开销很大，把他们包装到一个StaticContainer或者其它恰当的结构中。页脚会永远在列表的最底部，而页头会在最顶部。
                renderFooter = {this._renderFooter.bind(this, isFirstLoaded)}
                // 调用onEndReached之前的临界值，单位是像素。
                onEndReachedThreshold = {10}
                // 当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用。原生的滚动事件会被作为参数传递。译注：当第一次渲染时，如果数据不足一屏（比如初始值是空的），这个事件也会被触发，请自行做标记过滤。
                onEndReached = {this._onEndReached.bind(this, dispatch, nowRead, category)}
                dataSource = {this.dataSource.cloneWithRows(nowRead.articleList)}
                renderRow = {this._renderRow.bind(this)}
                // 指定在组件刚挂载的时候渲染多少行数据。用这个属性来确保首屏显示合适数量的数据，而不是花费太多帧逐步显示出来。
                initialListSize = {10}
                // 每次事件循环（每帧）渲染的行数。
                pageSize = {nowRead.articleList.length}
                refreshControl = {
                    <RefreshControl
                        refreshing = {nowRead.isRefreshing}
                        onRefresh = {this._onRefresh.bind(this)}
                        colors = {['#ff0000', '#00ff00', '#0000ff','#3ad564']}
                        progressBackgroundColor = {'#ffffff'} />
                } />
        );
    }

    componentWillMount() {
        /**
         * 所有交互完成后调度一个方法执行fetchArticles
         */
        InteractionManager.runAfterInteractions(() => {
            const {dispatch, category} = this.props;
            dispatch(fetchArticles(category));
        });
    }

    /**
     * Refresh
     */
    _onRefresh() {
        this.componentWillMount();
    }

    /**
     * 渲染列表的每一个item
     */
    _renderRow(rowData, sectionId, rowId, highLightRow) {
        return (
            <TouchableHighlight underlayColor = "rgba(34, 26, 38, 0.1)" onPress = {this._onItemClick(rowData, rowId)}>
                <View style = {{flexDirection: 'row', padding: 12, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#c9c9c9'}}>
                    <View style = {{flex: 1, marginLeft: 10}}>
                        <Text style = {{fontSize: 15, fontWeight: 'bold', color: 'black'}}>{rowData.desc}</Text>
                        <View style = {{flexDirection: 'row', marginTop: 4, justifyContent: 'space-between'}}>
                            <Text style = {{}}>{'作者：' + rowData.who}</Text>
                            <Text style = {{}}>{this._formatData(rowData.publishedAt)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    /**
     * item 点击跳转处理
     */
    _onItemClick(rowData, rowId) {
        const {navigator} = this.props;
        // if (navigator) {
        //     navigator.push({
        //         name: "ArticleDetail",
        //         component: ArticleDetail,
        //         params: {
        //             rowData
        //         }
        //     });
        // }
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

    _onEndReached(dispatch, nowRead, category, index) {
        if (typeof(nowRead) == 'undefined' || nowRead.isFirstLoaded) {
            return;
        }
        InteractionManager.runAfterInteractions(() => {
            dispatch(fetchArticles(category, nowRead.index + 1, true, nowRead));
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    progress: {
        marginVertical: 20,
        paddingBottom: 20,
        alignSelf: 'center'
    }
});

module.exports = ArticleList;