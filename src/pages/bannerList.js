/**
 * Created by chj on 2018/7/26.
 */
/**
 * Created by chj on 2018/7/26.
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
    FlatList,
    Clipboard,
    findNodeHandle,
    UIManager,
    Image,
    Animated
} from 'react-native';

import {connect} from 'react-redux';
const { width, height } = Dimensions.get('window');
import {ACTION_MIDDLEWARE_HTTP} from '../action/action';
import {carouselImgHeight} from '../constance/constValues';

import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import BannerItem from '../comment/bannerList/bannerListItem';
import NavigationBar from '../comment/navigationBar/navigationBar';
import {StatusBar_Height} from '../constance/constValues';
import Toast from '@remobile/react-native-toast';
import ShowBigImage from '../comment/showBigImage/showBigImage';

class bannerList extends Component<{}> {


    constructor(props){
        super(props);
        this.state = {
            data: [],
            isRefresh: false,
            isShowBigImage: false,
            bigImageUrl: '',
            bigImageY:0
        };
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.endReached = this.endReached.bind(this);
        this.getBannerData = this.getBannerData.bind(this);
        this.dismissBigImageClick = this.dismissBigImageClick.bind(this);
        
        this.bannerRefsObj=[];
    }

    componentDidMount() {
        this.getBannerData()
    }

    //获取列表数据
    getBannerData(type){
        this.props.getBannerData({
            successFunc: (data)=>{
                if (type === 'refresh'){
                    this.setState({
                        data
                    })
                }else
                    this.setState({
                        data:this.state.data.concat(data)
                    })

            },
            completeFunc:()=>{
                this.setState({
                    isRefresh: false
                })
            }
        })
    }

    /*flatList Item*/
    renderItem({ index, item }){
        return <BannerItem ref= {(ref)=>{
                               this.bannerRefsObj[index] = ref
                           }}
                           carousel={item}
                           itemImageFunc={this.bannerItemImageClick.bind(this, item,index)}
                           itemTextLongFunc={this.bannerItemTextLongClick.bind(this, item)}
        />
    }


    /*点击图片*/
    bannerItemImageClick(item,index){

        const handle = findNodeHandle(this.bannerRefsObj[index]);

        // UIManager.measure(handle,(x, y, width, height, pageX, pageY)=>{
        //     console.log(x);
        //     console.log(y);
        //     console.log(width);
        //     console.log(height);
        //     console.log(pageX);
        //     console.log(pageY);
        // });

        UIManager.measureInWindow(handle, (x,y,w,h)=>{
            console.log(x);
            console.log(y);
            console.log(w);
            console.log(h);
            
            this.setState({
                bigImageUrl: item.pic,
                bigImageY: y,
                isShowBigImage: true
            })
        })
        
       
    }

    //长按文字复制
    bannerItemTextLongClick(item){
        Clipboard.setString(item.text);
        Toast.showShortCenter('内容已复制')
    }

    /*点击图片取消浏览*/
    dismissBigImageClick(){
        this.setState({
            isShowBigImage: false
        })
    }

    /*下拉刷新*/
    refreshData(){
        this.getBannerData('refresh')
    }

    /*加载更多*/
    endReached(){
        this.getBannerData()
    }

    /*
      修改成scrollview 测试
    */
    render() {
        return (
            <View style={styles.container}>
                <FlatList ref="flatList"
                    data={ this.state.data }
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
        getBannerData:({successFunc:success,completeFunc: complete})=>{
            dispatch(ACTION_MIDDLEWARE_HTTP({
                url: 'onBannerDetail',
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

export default connect(mapStateToProps, mapDispatchToProps)(bannerList);