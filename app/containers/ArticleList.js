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
                renderFooter = {this._renderFooter.bind(this, isFirstLoaded)}
                onEndReached = {this._onEndReached.bind(this, dispatch, nowRead, category)} />
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
                        <ProgressBarAndroid />
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
        if (typeof(nowRead) == 'undefiend' || nowRead.isFirstLoaded) {
            return;
        }
        InteractionManager.runAfterInteractions(() => {
            dispatch(fetchArticles(category, nowRead.index + 1, true, nowRead));
        });
    }
}