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
const imageW = parseInt((width - imageListSpace) / 2);


const oldSize = '1024_768';
const topSize = String(width)+ '_' +String(imageW);
const downImageSize = String(imageW)+ '_' + String(imageW );

export default class imageItemOne extends Component<{}> {
    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.replaceString = this.replaceString.bind(this)
    }
    /*替换图片尺寸*/
    replaceString(string, newSize){
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
        if(index === 2){
            handle= findNodeHandle(this.refs.imageRef3);
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
                    <Image style={styles.topImage} source={{uri: this.replaceString(this.props.imageObject[0].img_1024_768,topSize)}}/>
                </TouchableOpacity>

                <View style={{flexDirection: 'row',marginTop: imageListSpace}}>
                    <TouchableOpacity ref="imageRef2" onPress={this.imageClick.bind(this,this.props.imageObject[1].img_1024_768, 1)}>
                        <Image style={styles.downLeftImage} source={{uri: this.replaceString(this.props.imageObject[1].img_1024_768,downImageSize)}}/>
                    </TouchableOpacity>

                    <TouchableOpacity ref="imageRef3" onPress={this.imageClick.bind(this,this.props.imageObject[2].img_1024_768, 2)}>
                        <Image style={styles.downRightImage} source={{uri: this.replaceString(this.props.imageObject[2].img_1024_768,downImageSize)}}/>
                    </TouchableOpacity>
                </View>
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
        height: imageW + imageListSpace + imageW,
    },
    topImage: {
        width: width,
        height: imageW,
    },
    downLeftImage: {
        width: imageW,
        height: imageW,

    },
    downRightImage: {
        width: imageW,
        height: imageW,
        marginLeft: imageListSpace
    },
});