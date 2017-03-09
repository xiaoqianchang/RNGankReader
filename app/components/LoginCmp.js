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
import { doLogin } from '../actions/login';

class LoginCmp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: '',
            phoneFocus: false,
            passwordFocus: false
        };
    }

    render() {
        return (
            <Image style = {styles.container} source = {require('../../images/bg_login.png')}>
                <TouchableOpacity onPress = {() => this._onCloseClick()}>
                    <Image style = {styles.close} source = {require('../../images/close.png')} />
                </TouchableOpacity>
                <View style = {{width: width, marginTop: 60, justifyContent: 'center', alignItems: 'center'}}>
                    <Image style = {styles.logo} source = {require('../../images/logo.png')} />
                    <Text style = {styles.logoText}>登录</Text>
                    <TextInput 
                        style = {this.state.phoneFocus ? styles.inputPhoneSelected : styles.inputPhoneNormal} 
                        placeholder = "请输入手机号" // 如果没有任何文字输入，会显示此字符串。
                        placeholderTextColor = "#D1D5DB" // 占位字符串显示的文字颜色。
                        underlineColorAndroid = "transparent" // 去掉 Android 上的底边框
                        multiline = {false} // 如果为true，文本框中可以输入多行文字。默认值为false。
                        blurOnSubmit = {true} // 如果为true，文本框会在提交的时候失焦。对于单行输入框默认值为true，多行则为false。
                        editable = {true} // 如果为false，文本框是不可编辑的。默认值为true。
                        keyboardType = "numeric" // 决定弹出的何种软键盘的，譬如numeric（纯数字键盘）。
                        secureTextEntry = {false} // 如果为true，文本框会遮住之前输入的文字，这样类似密码之类的敏感文字可以更加安全。默认值为false。
                        maxLength = {11} // 限制文本框中最多的字符数。使用这个属性而不用JS逻辑去实现，可以避免闪烁的现象。
                        selectionColor = "#9e91a3" // 设置输入框高亮时的颜色（在iOS上还包括光标）
                        onFocus = {() => this.setState({phoneFocus: true})} // 当文本框获得焦点的时候调用此回调函数。
                        onBlur = {() => this.setState({phoneFocus: false})} // 当文本框失去焦点的时候调用此回调函数。
                        onChangeText = {(text) => this.setState({phone: text})} // 当文本框内容变化时调用此回调函数。改变后的文字内容会作为参数传递。
                        />
                    <TextInput 
                        style = {this.state.passwordFocus ? styles.inputPasswordSelected : styles.inputPasswordNormal} 
                        placeholder = "请输入密码"
                        placeholderTextColor = "#D1D5DB"
                        underlineColorAndroid = "transparent"
                        multiline = {false}
                        blurOnSubmit = {true}
                        editable = {true} 
                        keyboardType = "default"
                        secureTextEntry = {true} // 无论 true 或 false keyboardType 软键盘弹出的是字母键盘（如果不设置，默认弹出的是汉字键盘）
                        maxLength = {6} 
                        onFocus = {() => this.setState({passwordFocus: true})}
                        onBlur = {() => this.setState({passwordFocus: false})}
                        onChangeText = {(text) => this.setState({password: text})} />
                    <View style = {styles.btnLogin}>
                        <Button title = "立即登录" color = "#6d5183" onPress = {() => this._onLoginClick()} />
                    </View>
                    <View style = {{width: width - 100, marginTop: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style = {{fontSize: 15}}>忘记密码</Text>
                        <Text style = {{fontSize: 15}}>注册</Text>
                    </View>
                </View>
            </Image>
        );
    }

    _onCloseClick() {
        var { navigator } = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    _onLoginClick() {
        InteractionManager.runAfterInteractions(() => {
            const { dispatch } = this.props;
            dispatch(doLogin(this.state.phone, this.state.password));
        });
    }
}

let { width, height } = Dimensions.get('window');
var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    close: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginLeft: 20,
        marginTop: 15
    },
    logo: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    logoText: {
        fontSize: 22,
        color: '#50385b',
        marginTop: 30
    },
    inputPhoneNormal: {
        width: width - 100,
        height: 44,
        marginTop: 30,
        padding: 0,
        paddingLeft: 28,
        textAlignVertical: 'center', // 文本默认会垂直居中，可设置textAlignVertical: top样式来使其居顶显示。
        borderWidth: 1,
        borderColor: '#eae9e7', // this.state.phoneFocus ? '#9e91a3' : '#eae9e7',
        borderRadius: 20,
        backgroundColor: '#eae9e7',
        color: '#50385b' // 输入文本颜色
    },
    inputPhoneSelected: {
        width: width - 100,
        height: 44,
        marginTop: 30,
        padding: 0,
        paddingLeft: 28,
        textAlignVertical: 'center', // 文本默认会垂直居中，可设置textAlignVertical: top样式来使其居顶显示。
        borderWidth: 1,
        borderColor: '#9e91a3', // this.state.phoneFocus ? '#9e91a3' : '#eae9e7',
        borderRadius: 20,
        backgroundColor: '#eae9e7',
        color: '#50385b' // 输入文本颜色
    },
    inputPasswordNormal: {
        width: width - 100,
        height: 44,
        marginTop: 17,
        padding: 0,
        paddingLeft: 28,
        textAlignVertical: 'center', // 文本默认会垂直居中，可设置textAlignVertical: top样式来使其居顶显示。
        borderWidth: 1,
        borderColor: '#eae9e7', // this.state.passwordFocus ? '#9e91a3' : '#eae9e7',
        borderRadius: 20,
        backgroundColor: '#eae9e7',
        color: '#50385b'
    },
    inputPasswordSelected: {
        width: width - 100,
        height: 44,
        marginTop: 17,
        padding: 0,
        paddingLeft: 28,
        textAlignVertical: 'center', // 文本默认会垂直居中，可设置textAlignVertical: top样式来使其居顶显示。
        borderWidth: 1,
        borderColor: '#9e91a3', // this.state.passwordFocus ? '#9e91a3' : '#eae9e7',
        borderRadius: 20,
        backgroundColor: '#eae9e7',
        color: '#50385b'
    },
    btnLogin: {
        width: width - 100,
        marginTop: 30,
        borderRadius: 10
    }
});

module.exports = LoginCmp;