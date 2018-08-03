/**
 * Created by chj on 2018/7/27.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';

import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
const {width, height} = Dimensions.get('window');
import {carouselImgHeight} from '../../constance/constValues';

export default class bannerListItem extends Component<{}> {
    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.itemImageFunc = this.itemImageFunc.bind(this);
        this.itemTextLongFunc = this.itemTextLongFunc.bind(this)
    }
    itemImageFunc(){
        this.props.itemImageFunc()
    }
    itemTextLongFunc(){
        this.props.itemTextLongFunc()
    }
    render() {
        return (
            <View>
                {
                    this.props.type === 'cover' ? <View style={styles.carouselView}>
                            <Image source={{uri: this.props.carousel.pic}} style={styles.carouselImg}/>
                            {
                                this.props.carousel.text.length >1 && <View style={styles.carouselTextView}>
                                    <Text style={styles.carouselText}>
                                        {this.props.carousel.text}
                                    </Text>
                                </View>
                            }
                        </View>: <View>
                            <TouchableOpacity onPress={this.itemImageFunc}>
                                <Image source={{uri: this.props.carousel.pic}} style={styles.carouselImgType}/>
                            </TouchableOpacity>
                            {
                                this.props.carousel.text.length >1 && <TouchableOpacity style={styles.carouselTextViewType}
                                                                                        onLongPress={this.itemTextLongFunc}>
                                    <Text style={styles.carouselTextType}>
                                        {this.props.carousel.text}
                                    </Text>
                                </TouchableOpacity>
                            }
                        </View>
                }
            </View>
        );
    }
}
bannerListItem.propTypes = {
    carousel: PropTypes.object.isRequired,
    type: PropTypes.string,
    itemImageFunc:PropTypes.func,
    itemTextLongFunc:PropTypes.func,
};
bannerListItem.defaultProps = {
    itemImageFunc: ()=>{},
    itemTextLongFunc: ()=>{},
};


const styles = StyleSheet.create({
    carouselView :{
        height: carouselImgHeight,
        justifyContent: 'flex-end'
    },
    carouselImg: {
        width,
        height: carouselImgHeight,
        position: 'absolute'
    },
    carouselTextView: {
        marginBottom: 0,
        backgroundColor:'rgba(0,0,0,0.5)',
        padding: 5,
        paddingBottom: 10,
        color: 'white',
        alignItems: 'center',
    },
    carouselText: {
        color: 'white',
        lineHeight: 15,
        fontSize: 12
    },
    carouselImgType: {
        width,
        height: carouselImgHeight,
    },
    carouselTextViewType: {
        paddingHorizontal: 5,
        color: 'white',
        alignItems: 'center',
        paddingVertical: 15
    },
    carouselTextType: {
        lineHeight: 18,
        fontSize: 12,
    },
});