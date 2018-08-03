/**
 * Created by chj on 2018/7/31.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
    findNodeHandle,
    UIManager
} from 'react-native';

import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import {imageListSpace} from '../../constance/constValues';
import {replaceString} from '../../utils/replaceSize';

const {width,height} = Dimensions.get('window');
const rightTopImageH = 100;
const imageW = parseInt((width - imageListSpace) / 2);


const oldSize = '1024_768';
const newSize = String(imageW)+ '_' +String(imageW + imageListSpace + rightTopImageH);


export default class imageItemOne extends Component<{}> {
    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.replaceString = this.replaceString.bind(this)
    }
    /*替换图片尺寸*/
    replaceString(string){
        return replaceString(string, oldSize,newSize);
    }
    imageClick(imageUrl,index){
        let imageOrigin={};

        let  handle;
        if(index === 0){
            handle= findNodeHandle(this.refs.imageRef1);
        }
        if(index === 1){
            handle= findNodeHandle(this.refs.imageRef2);
        }


        UIManager.measureInWindow(handle, (x,y,w,h)=>{
            console.log(x);
            console.log(y);
            console.log(w);
            console.log(h);
            imageOrigin = {
                x,
                y,
                width: w,
                height: h
            };
            this.props.imageClick(imageUrl,imageOrigin)

        });    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity ref="imageRef1" onPress={this.imageClick.bind(this,this.props.imageObject[0].img_1024_768, 0)}>
                    <Image style={styles.leftImage} source={{uri: this.replaceString(this.props.imageObject[0].img_1024_768)}}/>
                </TouchableOpacity>

                <TouchableOpacity ref="imageRef2" onPress={this.imageClick.bind(this,this.props.imageObject[1].img_1024_768, 1)}>
                    <Image style={styles.rightImage} source={{uri: this.replaceString(this.props.imageObject[1].img_1024_768)}}/>
                </TouchableOpacity>
            </View>
        );
    }
}
imageItemOne.propTypes = {
    imageObject: PropTypes.array.isRequired,
    imageClick: PropTypes.func.isRequired,

};
imageItemOne.defaultProps = {
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: imageListSpace,
        height: imageW + imageListSpace + rightTopImageH,
        flexDirection: 'row'
    },
    leftImage: {
        width: imageW,
        height: imageW + imageListSpace + rightTopImageH,
    },
    rightImage: {
        width: imageW,
        height: imageW + imageListSpace + rightTopImageH,
        marginLeft: imageListSpace
    }
});