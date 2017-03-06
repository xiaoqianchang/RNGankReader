import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    TouchableHighlight,
    TouchableOpacity,
    Animated,
    Easing,
    InteractionManager,
    ScrollView,
    View,
    Image,
    Text
} from 'react-native';
import { fetchBeauty } from '../actions/beauty';
import { connect } from 'react-redux';
import ImageDetailCmp from '../components/ImageDetailCmp';

class BeautyCmp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progressValue : new Animated.Value(0)
        };
    }

    componentDidMount() {
        Animated.timing(this.state.progressValue, {
            toValue: width,
            duration: 1500,
            easing: Easing.linear
        }).start();
    }

    componentWillMount() {
        InteractionManager.runAfterInteractions(() => {
            const { dispatch } = this.props;
            dispatch(fetchBeauty());
        });
    }

    render() {
        const { beautyReducers, navigator } = this.props;
        return (
            <View style = {{flex: 1}}>
                <View style = {styles.headerBar}>
                    <TouchableHighlight underlayColor = "rgba(34, 26, 38, 0.1)" onPress = {() => this._onBackClick()}>
                        <Image style = {styles.iconImage} source = {require('../../images/icon_back.png')}></Image>
                    </TouchableHighlight>
                    <Text style = {styles.headerText}>美女</Text>
                    <TouchableHighlight style = {{right: 0}} underlayColor = "rgba(34, 26, 38, 0.1)" onPress = {() => this.onRefreshClick()}>
                        <Image style = {styles.iconImage} source = {require('../../images/ic_refresh.png')}></Image>
                    </TouchableHighlight>
                </View>
                <Animated.View style = {{width: this.state.progressValue, height: 2, backgroundColor: '#27B5EE'}}></Animated.View>
                <ScrollView>
                    <View style = {{flexDirection: 'row'}}>
                        <View>
                            {this._getImages(beautyReducers.beauty.slice(0, 6), navigator)}
                        </View>
                        <View>
                            {this._getImages(beautyReducers.beauty.slice(6, 12), navigator)}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    _onBackClick() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.pop();
        }
        return true;
    }

    onRefreshClick() {
        this.componentWillMount();
    }

    /**
     * 创建每张图片显示的控件
     */
    _getImages(items, navigator) {
        return (
            items.map((item, i) => {
                return (
                    <TouchableOpacity key = {i} style = {{padding: 2}} onPress = {() => this._onImageClick(item, navigator)}>
                        <Image key = {i + '_' + item._id} style = {{width: (width - 8) / 2, height: parseInt(Math.random() * 20 + 12) * 10}} source = {{uri: item.url}}></Image>
                    </TouchableOpacity>
                )
            })
        );
    }

    _onImageClick(item, navigator) {
        if (navigator) {
            navigator.push({
                name: 'ImageDetailCmp',
                component: ImageDetailCmp,
                params: {
                    image: item
                }
            });
        }
    }

    _getChildrenStyle() {
        return {
            width: (screenWidth - 18) / 2,
            height: parseInt(Math.random() * 20 + 12) * 10,
            backgroundColor: 'rgb(92, 67, 155)',
            paddingTop: 20,
            borderRadius: 8
        }
    }
}

let { width, height } = Dimensions.get('window');
var styles = StyleSheet.create({
    iconImage: {
        width: 30,
        height: 30,
        margin: 4
    },
    headerBar: {
        backgroundColor: '#27B5EE',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
    },
    headerText: {
        fontSize: 22,
        color: 'white',
        marginLeft: 10
    }
});

function mapStateToProps(state) {
    const { beautyReducers } = state;
    return {
        beautyReducers
    }
}

export default connect(mapStateToProps)(BeautyCmp);