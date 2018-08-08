/**
 * Created by chj on 2018/7/26.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    FlatList
} from 'react-native';
import {connect} from 'react-redux';
const { width, height } = Dimensions.get('window');
import {ACTION_MIDDLEWARE_HTTP} from '../action/action';

import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import ImageItemOne from '../comment/imageListOne/imageItemOne';
import ImageItemTwo from '../comment/imageListOne/imageItemTwo';
import ImageItemThree from '../comment/imageListOne/imageItemThree';
import ImageItemFour from '../comment/imageListOne/imageItemFour';
import ImageItemFive from '../comment/imageListOne/imageItemFive';
import {StatusBar_Height} from '../constance/constValues';
import ShowBigImage from '../comment/showBigImage/showBigImage';
import Bmob from '../lib/app'

class imageListOne extends Component<{}> {


    constructor(props){

        super(props);

        this.state = {
            imageType: this.props.navigation.state.params.imageType,
            dataSource: [],
            isRefresh: false,
            isShowBigImage: false,
            bigImageY: 0,
            bigImageX: 0,
            bigImageUrl: '',
            imageWidth: 0,
            imageHeight: 0
        };
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.endReached = this.endReached.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.dismissBigImageClick = this.dismissBigImageClick.bind(this);
    }

    componentDidMount() {
        this.getImageListData()
    }
    //获取列表数据
    getImageListData(type){
        let imageRandom = Math.floor(Math.random()*32940);
        const imageQuery = Bmob.Query(this.state.imageType);
        imageQuery.limit(12); // 条数
        imageQuery.skip(imageRandom); // 从第几条数据开始
        imageQuery.find().then(result => {
            console.log('image result:', result);

            if(result.length != 12){
                this.setState({
                    isRefresh: false
                })
            }
            else{
                let object = [
                    {'one': [result[0],result[1],result[2]]},
                    {'two': [result[3],result[4],result[5]]},
                    {'three': [result[6],result[7]]},
                    {'four': [result[8],result[9],result[10]]},
                    {'five': [result[11]]},
                ];

                if (type === 'refresh'){
                    this.setState({
                        dataSource: object,
                        isRefresh: false
                    })
                }else
                    this.setState({
                        dataSource:this.state.dataSource.concat(object),
                        isRefresh: false
                    })
            }
        }).catch((err)=>{
            console.log(err);
            this.setState({
                isRefresh: false
            })
        });
    }

    /*图片点击*/
    imageClick(){
        this.setState({
            bigImageUrl: arguments[0],
            bigImageY: arguments[1].y,
            bigImageX: arguments[1].x,
            imageWidth: arguments[1].width,
            imageHeight: arguments[1].height,
            isShowBigImage: true,
        })
    }


    /*flatList Item*/
    renderItem({ index, item }){
        if (index % 5 === 0){
            return <ImageItemOne imageObject={item.one} imageClick={this.imageClick.bind(this)}/>
        }else if (index % 5 === 1){
            return <ImageItemTwo imageObject={item.two} imageClick={this.imageClick.bind(this)}/>
        }else if (index % 5 === 2){
            return <ImageItemThree imageObject={item.three} imageClick={this.imageClick.bind(this)}/>
        }else if (index % 5 === 3){
            return <ImageItemFour imageObject={item.four} imageClick={this.imageClick.bind(this)}/>
        }else
            return <ImageItemFive imageObject={item.five} imageClick={this.imageClick.bind(this)}/>
    }
    /*下拉刷新*/
    refreshData(){
        this.getImageListData('refresh')
    }

    /*加载更多*/
    endReached(){
        this.getImageListData()
    }

    /*点击图片取消浏览*/
    dismissBigImageClick(){
        this.setState({
            isShowBigImage: false
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList data={ this.state.dataSource }
                          onEndReachedThreshold={ 0.8 }
                          renderItem={ this.renderItem }
                          onEndReached={ this.endReached }
                          extraData={this.state}
                          keyExtractor={(item, index) => String(index) }
                          onRefresh={() => {
                              this.setState({
                                  isRefresh: true
                              });
                              this.refreshData()
                          }}
                          refreshing={this.state.isRefresh}
                />
                <TouchableOpacity style={styles.backBtn} onPress={()=>{
                    this.props.navigation.pop()
                }}>
                    <Text style={styles.backIcon}>&#xe63f;</Text>
                </TouchableOpacity>
                {
                    this.state.isShowBigImage ? <ShowBigImage imageY={this.state.bigImageY}
                                                              dismissFunc={this.dismissBigImageClick}
                                                              imageUrl={this.state.bigImageUrl}
                                                              imageX={this.state.bigImageX}
                                                              imageWidth= {this.state.imageWidth}
                                                              imageHeight= {this.state.imageHeight}
                        /> : null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    backIcon: {
        fontFamily: 'iconfont',
        fontSize: 30,
        color: 'white'
    },
    backBtn: {
        position: 'absolute',
        top:StatusBar_Height,
        left: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: 34,
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 17
    }

});

function mapStateToProps(state) {

    return {

    };

}

function mapDispatchToProps(dispatch) {
    return {
        getImageListData:({params: params, successFunc:success,completeFunc: complete})=>{
            dispatch(ACTION_MIDDLEWARE_HTTP({
                url: 'onRequestImage',
                params: params,
                loading:()=>{},
                success:(data)=>{
                    success(data)
                },
                fail:()=>{},
                complete:()=>{
                    complete()
                }
            }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(imageListOne);