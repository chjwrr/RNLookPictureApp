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
    TouchableOpacity,
    Image,
    Dimensions,
    findNodeHandle,
    UIManager
} from 'react-native';

import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
const {width, height} = Dimensions.get('window');
import {carouselTypeImgHeight} from '../../constance/constValues';
import Color from '../../constance/staticColor';
import imageTypeToName from '../../utils/imageTypeToName';
import {replaceString} from '../../utils/replaceSize';

const oldSize = '1024_768';
const newSize = String(width)+'_200';

const url = 'http://p18.qhimg.com/bdm/375_200_85/t012ba3b464dae6293c.jpg';
export default class typeView extends Component<{}> {
    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.replaceString = this.replaceString.bind(this);
        this.imageListFunc = this.imageListFunc.bind(this);
        this.imageDetailFunc = this.imageDetailFunc.bind(this);
    }

    /*替换图片尺寸*/
    replaceString(string){
        return replaceString(string, oldSize,newSize);
    }

    /*图片列表*/
    imageListFunc(type){
        this.props.imageList(type);
    }
    /*图片详情*/
    imageDetailFunc(imageURL,index){
        let imageOrigin={};

        let  handle;

        if(index === 1){
            handle= findNodeHandle(this.refs.imageRef2);
        }
        if(index === 2){
            handle= findNodeHandle(this.refs.imageRef3);
        }
        if(index === 3){
            handle= findNodeHandle(this.refs.imageRef4);
        }
        if(index === 4){
            handle= findNodeHandle(this.refs.imageRef5);
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
            this.props.imageDetail(imageURL,imageOrigin)

        });
    }

    render() {
        let title = imageTypeToName(this.props.title);

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.topImgView} onPress={()=>{
                    this.imageListFunc(this.props.title)
                }}>
                    <Image style={styles.topImg} source={{uri: this.replaceString(this.props.imageUrls[0].img_1024_768)}}/>
                    <View style={styles.topTitleView}>
                        <Text style={styles.topTitle}>
                            {title}
                        </Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.centerImgView}>
                    <TouchableOpacity ref="imageRef2" style={styles.downItemView} onPress={()=>{
                        this.imageDetailFunc(this.props.imageUrls[1].img_1024_768, 1);
                    }}>
                        <Image style={styles.centerImg} source={{uri: this.replaceString(this.props.imageUrls[1].img_1024_768)}}/>
                    </TouchableOpacity>
                    <TouchableOpacity ref="imageRef3" style={styles.downItemView} onPress={()=>{
                        this.imageDetailFunc(this.props.imageUrls[2].img_1024_768, 2);
                    }}>
                        <Image style={styles.centerImg} source={{uri: this.replaceString(this.props.imageUrls[2].img_1024_768)}}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.downImgView}>
                    <TouchableOpacity ref="imageRef4" style={styles.downItemView} onPress={()=>{
                        this.imageDetailFunc(this.props.imageUrls[3].img_1024_768, 3);
                    }}>
                        <Image style={styles.downImg} source={{uri: this.replaceString(this.props.imageUrls[3].img_1024_768)}}/>
                    </TouchableOpacity>
                    <TouchableOpacity ref="imageRef5" style={styles.downItemView} onPress={()=>{
                        this.imageDetailFunc(this.props.imageUrls[4].img_1024_768, 4);
                    }}>
                        <Image style={styles.downImg} source={{uri: this.replaceString(this.props.imageUrls[4].img_1024_768)}}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
typeView.propTypes = {
    title: PropTypes.string.isRequired,
    imageUrls: PropTypes.array.isRequired,
    imageList:PropTypes.func.isRequired,
    imageDetail:PropTypes.func.isRequired
};
typeView.defaultProps = {
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topImgView: {
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: Color.HOME_TYPE_IMAGE_BG_COLOR,
    },
    topImg: {
        width,
        height: carouselTypeImgHeight,
        overflow: 'hidden',
        marginTop: 5,
        position: 'absolute'
    },
    topTitleView: {
        backgroundColor:'rgba(0,0,0,0.5)',
        height: carouselTypeImgHeight,
        alignItems: 'center',
        marginTop: 5
    },
    topTitle: {
        color: 'white',
        lineHeight: carouselTypeImgHeight,
        fontWeight: 'bold',
        fontSize: 50
    },
    downImg:{
        width: width/2,
        height: carouselTypeImgHeight,
        marginBottom: 5
    },
    downItemView: {
        flex: 1,
    },
    downImgView: {
        flexDirection: 'row',
        backgroundColor: Color.HOME_TYPE_IMAGE_BG_COLOR,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    centerImgView: {
        flexDirection: 'row',
    },
    centerImg:{
        flex: 1,
        width: width/2,
        height: carouselTypeImgHeight,
    },
});