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
    Dimensions,
    Image
} from 'react-native';

import PropTypes from 'prop-types';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import Banner from '../bannerList/bannerListItem';

const {width, height} = Dimensions.get('window');
import {carouselImgHeight} from '../../constance/constValues';

export default class carouselView extends Component<{}> {
    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.click = this.click.bind(this);
    }
    click(){
        this.props.click()
    }
    render() {
        return (
            <TouchableOpacity onPress={this.click}>
                <Banner carousel={this.props.carousel} type="cover"/>
            </TouchableOpacity>
        );
    }
}
carouselView.propTypes = {
    carousel: PropTypes.object.isRequired,
    click: PropTypes.func.isRequired
};
carouselView.defaultProps = {
};


const styles = StyleSheet.create({

});