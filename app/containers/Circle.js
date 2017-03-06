import React, { Component } from 'react';
import {
    StyleSheet,
    Platform
} from 'react-native';
import CircleList from '../components/CircleList';

class Circle extends Component {

    render() {
        return (
            <CircleList {...this.props} />
        );
    }
}

module.exports = Circle;