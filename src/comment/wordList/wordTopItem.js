/**
 * Created by chj on 2018/7/30.
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
import { NavigationBar_Height, StatusBar_Height } from '../../constance/constValues';
import Color from '../../constance/staticColor';
import LinearGradient from 'react-native-linear-gradient'
export default class wordTopItem extends Component<{}> {
    constructor(props){
        super(props);
        this.state = {
            currentIndex: 0
        };
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.topClick = this.topClick.bind(this);
        this.leftBtnClick = this.leftBtnClick.bind(this)
    }

    topClick(index){
        this.props.topClick(index)
    }
    leftBtnClick(){
        this.props.leftBtnClick()
    }

    render() {
        return (
            <View style={styles.containe}>

                <View style={styles.topItem}>
                    <TouchableOpacity style={[styles.topItemBtn]}
                                      onPress={()=>{
                                          this.setState({
                                              currentIndex: 0
                                          });
                                          this.topClick(0)
                                      }}
                    >
                        <Text style={this.state.currentIndex === 0 ? {color: 'blue'} : styles.normal}>笑话</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.topItemBtn,styles.line]}
                                      onPress={()=>{
                                           this.setState({
                                              currentIndex: 1
                                          });
                                           this.topClick(1)
                                      }}
                    >
                        <Text style={this.state.currentIndex === 1 ? {color: '#FF00FF'} : styles.normal}>说说</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.leftBtn} onPress={this.leftBtnClick}>
                    <Text style={{fontFamily: 'iconfont'}}>&#xe617;</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
wordTopItem.propTypes = {
    topClick: PropTypes.func.isRequired,
    leftBtnClick: PropTypes.func.isRequired,
};
wordTopItem.defaultProps = {
};


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        height: NavigationBar_Height + StatusBar_Height,
    },
    leftBtn:{
        position:'absolute',
        marginTop: StatusBar_Height,
        height: 38,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    topItem: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 38,
        marginTop: StatusBar_Height,
        flexDirection: 'row',
        marginBottom: 6
    },
    topItemBtn: {
        paddingHorizontal: 40,
        paddingVertical: 5,
    },
    line:{
        borderLeftWidth: 1,
        borderLeftColor: 'black'
    },
    current:{

    },
    normal: {
        color: 'black'
    }
});