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
import {connect} from 'react-redux';

import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import ShowBigImage from '../comment/showBigImage/showBigImage';

class showBigImageDetail extends Component<{}> {

    constructor(props){
        super(props);
        this.state = {
            imageInfo: this.props.navigation.state.params.imageInfo
        };
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    dismissBigImageClick(){
        this.props.navigation.pop()
    }
    
    render() {
        return (
            <View style={styles.container}>
                <ShowBigImage imageY={this.state.imageInfo.bigImageY}
                              dismissFunc={this.dismissBigImageClick.bind(this)}
                              imageUrl={this.state.imageInfo.bigImageUrl}
                              imageX={this.state.imageInfo.bigImageX}
                              imageWidth= {this.state.imageInfo.imageWidth}
                              imageHeight= {this.state.imageInfo.imageHeight}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
});

function mapStateToProps(state) {

    return {

    };

}

function mapDispatchToProps(dispatch) {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(showBigImageDetail);