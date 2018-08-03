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

const screenWidth = Dimensions.get('window').width;

const oldSize = '1024_768';
const newSize = String(screenWidth)+ '_' + String(screenWidth );
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
    imageClick(imageUrl){
        let imageOrigin={};

        let  handle = findNodeHandle(this.refs.imageRef);

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

        });
    }
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity ref="imageRef" onPress={this.imageClick.bind(this,this.props.imageObject[0].img_1024_768)}>
                    <Image style={styles.image} source={{uri: this.replaceString(this.props.imageObject[0].img_1024_768)}}/>
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
        marginBottom: imageListSpace
    },
    image: {
        width: screenWidth,
        height: screenWidth,
    }
});