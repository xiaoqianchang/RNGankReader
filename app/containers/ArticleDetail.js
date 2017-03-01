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

    render() {
        const {rowData, navigator} = this.props;
        return (
            <View style = {{flex: 1}}>
                <Text>sss</Text>
            </View>
        );
    }
}

module.exports = ArticleDetail;