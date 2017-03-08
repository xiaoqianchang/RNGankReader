import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    InteractionManager,
    TouchableOpacity,
    ScrollView,
    View,
    Text,
    Image,
    TextInput,
    Button
} from 'react-native';

class LoginCmp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: ''
        };
    }

    render() {
        return (
            // <ScrollView>
                <View style = {styles.container}>
                    {/*<Image source = {require('../../images/bg_login.png')}>*/}
                    <Image style = {styles.logo} source = {require('../../images/logo.png')} />
                        <Text>登录</Text>
                        <TextInput style = {styles.input} editable = {true} maxLength = {11} onChangeText = {(text) => this.setState({phone: text})} />
                        <TextInput style = {styles.input} editable = {true} maxLength = {6} onChangeText = {(text) => this.setState({password: text})} />
                        <Button title = "登录" color = "#ffcccc" onPress = {() => this._onLogin()} />
                    {/*</Image>*/}
                </View>
            // </ScrollView>
            // <Text>ssss</Text>
        );
    }

    _onLogin() {
        InteractionManager.runAfterInteractions(() => {
            const { dispatch } = this.props;
            dispatch(doLogin(this.state.phone, this.state.password));
        });
    }
}

let { width, height } = Dimensions.get('window');
var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logo: {
        // width: 30,
        // height: 30,
        resizeMode: 'center'
    },
    logoText: {
        fontSize: 22,
        color: '#50385b'
    },
    input: {
        width: width - 20,
        height: 44,
    }
});

module.exports = LoginCmp;