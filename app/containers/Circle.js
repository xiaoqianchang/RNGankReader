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
import CircleList from '../components/CircleList';

class Circle extends Component {

    

    render() {
        return (
            <CircleList />
        );
    }
}

module.exports = Circle;