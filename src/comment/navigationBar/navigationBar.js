/**
 * Created by chj on 2018/7/27.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';

import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import {NavigationBar_Height, StatusBar_Height} from '../../constance/constValues';

export default class navigationBar extends Component<{}> {
    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.leftFunc = this.leftFunc.bind(this);
        this.centerFunc = this.centerFunc.bind(this);
        this.rightFunc = this.rightFunc.bind(this);
    }

    leftFunc(){
        this.props.leftFunc();
    }
    centerFunc(){
        this.props.centerFunc();
    }
    rightFunc(){
        this.props.rightFunc();
    }

    render() {
        console.log('leftTitleType:',this.props.leftTitleType);
        return (
            <View style={styles.container}>
                <View style={styles.navigationBar}>
                    <View style={styles.leftView}>
                        {
                            this.props.leftTitleType === 'iconfont' ?
                                <TouchableOpacity onPress={this.leftFunc}>
                                    <Text style={
                                    [styles.leftTitle, {
                                        fontSize: this.props.leftTitleFontSize,
                                        color: this.props.leftTitleColor,
                                        fontFamily: 'iconfont'
                                    }]
                                }>{this.props.leftIcon}</Text>
                                </TouchableOpacity> : this.props.leftTitleType === 'string' ?
                                <TouchableOpacity onPress={this.leftFunc}>
                                    <Text style={
                                [styles.leftTitle, {
                                    fontSize: this.props.leftTitleFontSize,
                                    color: this.props.leftTitleColor
                                }]
                                }>{this.props.leftTitle}</Text>
                                </TouchableOpacity> : this.props.leftTitleType === 'image' ?
                                    <TouchableOpacity onPress={this.leftFunc}>
                                        <Image source={this.props.leftImage}/>
                                    </TouchableOpacity> : null
                        }
                    </View>
                    <TouchableOpacity activeOpacity={1} onPress={this.centerFunc} style={styles.centerView}>
                        <Text style={
                            [styles.centerTitle, {
                                fontSize: this.props.centerTitleFontSize,
                                color: this.props.centerTitleColor
                            }]
                        }>{this.props.centerTitle}</Text>
                    </TouchableOpacity>
                    <View style={styles.rightView}>
                        {
                            this.props.rightTitleType === 'iconfont' ?
                                <TouchableOpacity onPress={this.rightFunc}>
                                    <Text style={
                                    [styles.rightTitle, {
                                        fontSize: this.props.rightitleFontSize,
                                        color: this.props.rightTitleColor,
                                        fontFamily: 'iconfont'
                                    }]
                                }>{this.props.rightIcon}</Text>
                                </TouchableOpacity> : this.props.rightTitleType === 'string' ?
                                    <TouchableOpacity onPress={this.rightFunc}>
                                        <Text style={
                                    [styles.rightTitle, {
                                        fontSize: this.props.rightTitleFontSize,
                                        color: this.props.rightTitleColor
                                    }]
                                }>{this.props.rightTitle}</Text>
                                </TouchableOpacity> : this.props.rightTitleType === 'string' ?
                                    <TouchableOpacity onPress={this.rightFunc}>
                                        <Image source={this.props.rightImage}/>
                                    </TouchableOpacity> : null
                        }
                    </View>
                </View>
            </View>
        );
    }
}
navigationBar.propTypes = {
    leftIcon: PropTypes.any, // iconfont
    leftImage: PropTypes.object, // 图片地址
    leftTitle: PropTypes.string, // 字符串
    leftTitleType: PropTypes.string, // iconfont  or  string  or  image
    leftTitleFontSize: PropTypes.number, // 字体大小
    leftTitleColor: PropTypes.string, // 字体颜色
    leftFunc: PropTypes.func, // 左侧点击事件

    centerTitle: PropTypes.string, // 标题
    centerTitleColor: PropTypes.string, // 标题颜色
    centerTitleFontSize: PropTypes.number, // 标题大小
    centerFunc: PropTypes.func, // 中间点击事件

    rightIcon: PropTypes.any, // iconfont
    rightImage: PropTypes.object, // 图片地址
    rightTitle: PropTypes.string, // 字符串
    rightTitleType: PropTypes.string, // iconfont  or  string
    rightTitleFontSize: PropTypes.number, // 字体大小
    rightTitleColor: PropTypes.string, // 字体颜色
    rightFunc: PropTypes.func, // 右侧点击事件
};
navigationBar.defaultProps = {
    leftTitle: '返回',
    leftImage: null,
    leftTitleType: null,
    leftTitleFontSize: 14,
    leftTitleColor: 'black',
    leftFunc:()=>{},

    centerTitle: '',
    centerTitleColor: 'black',
    centerTitleFontSize: 20,
    centerFunc:()=>{},

    rightTitle: '设置',
    rightImage: null,
    rightTitleType: null,
    rightTitleFontSize: 14,
    rightTitleColor: 'black',
    rightFunc:()=>{},
};


const styles = StyleSheet.create({
    container: {
        height: NavigationBar_Height+StatusBar_Height,
        backgroundColor: 'white'
    },
    navigationBar: {
        height: NavigationBar_Height,
        marginTop: StatusBar_Height,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    leftView: {
        width: 50,
        marginLeft: 10,
        marginTop: 5
    },
    rightView: {
        width: 50,
        marginRight: 10,
        marginTop: 5
    },
    centerView: {

    },
    leftTitle: {

    },
    centerTitle: {

    },
    rightTitle: {
        textAlign: 'right',
        fontFamily: 'iconfont'
    }
});