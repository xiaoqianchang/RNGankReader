import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    LayoutAnimation,
    Animated,
    Easing,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View,
    Image,
    Text
} from 'react-native';

class ImageDetailCmp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            w: new Animated.Value(0.5),
            h: new Animated.Value(0.5)
        };
        this.image = props.image;
    }

    componentDidMount() {
        Animated.timing(this.state.w, {
            toValue: width * 1,
            duration: 500,
            easing: Easing.linear
        }).start();
        Animated.timing(this.state.h, {
            toValue: height * 1,
            duration: 500,
            easing: Easing.linear
        }).start();
    }

    componentWillMount() {
        LayoutAnimation.spring();
    }

    render() {
        return (
            <View style = {{flex: 1}}>
                <View style = {styles.headerBar}>
                    <TouchableHighlight underlayColor = "rgba(34, 26, 38, 0.1)" onPress = {() => this._onBackClick()}>
                        <Image style = {styles.iconImage} source = {require('../../images/icon_back.png')}></Image>
                    </TouchableHighlight>
                    <Text style = {styles.headerText}>{this.image.who}</Text>
                    <Text style = {styles.headerText}>{this.image.desc}</Text>
                </View>
                <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableWithoutFeedback>
                        <Animated.View style = {{width: this.state.w, height: this.state.h}} source = {{uri: this.image.url}}></Animated.View>
                    </TouchableWithoutFeedback>
                    {/*<Image style = {{width: width, height: height}} source = {{uri: this.image.url}}></Image>*/}
                </View>
            </View>
        );
    }

    _onBackClick() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.pop();
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

module.exports = ImageDetailCmp;