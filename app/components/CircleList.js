import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    ListView,
    RefreshControl,
    TouchableHighlight,
    InteractionManager,
    ActivityIndicator,
    Platform,
    View,
    Image,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/circle';

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
        let isFirstLoaded = 0 != 0;

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
        // InteractionManager.runAfterInteractions(() => {
        //     dispatch(fetchPosts(circle.index + 1));
        // });
    }
}

let {width, height} = Dimensions.get('window');
var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

function mapStateToProps(state) {
  const {circle} = state;
  return {
      circle
  }
}

export default connect(mapStateToProps)(CircleList);