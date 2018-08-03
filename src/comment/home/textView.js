/**
 * Created by chj on 2018/7/25.
 */
/**
 * Created by chj on 2018/5/16.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';

export default class textView extends Component<{}> {
    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.textClick = this.textClick.bind(this)
    }

    textClick(){
        this.props.textClick()
    }
    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={this.textClick}>
                <Text style={styles.text}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}
textView.propTypes = {
    text: PropTypes.string.isRequired,
    textClick: PropTypes.func.isRequired
};
textView.defaultProps = {
};


const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    text: {
        fontSize: 13,
        lineHeight: 15,
    }
});