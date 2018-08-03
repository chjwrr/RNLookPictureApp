/**
 * Created by chj on 2018/4/17.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    ScrollView,
    RefreshControl,
} from 'react-native'
import Color from '../constance/staticColor';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import {ACTION_MIDDLEWARE_HTTP} from '../action/action';
import Swiper from 'react-native-swiper';
import CarouselView from '../comment/home/carouselView';
import {carouselImgHeight} from '../constance/constValues';
import TextView from '../comment/home/textView';
import ImageView from '../comment/home/typeView';

class home extends Component {

    static navigationOptions = ({ navigation, screenProps }) => ({
        headerTitle: <Text>test</Text>,
        headerStyle: {elevation: 0, shadowOpacity: 0} ,// 导航条样式
    });

    constructor(props){
        super(props);
        this.state = {
            carousel: [],
            isRefresh: false,
            img: {},
            word: [],
            typeName:['pet','model','love','comic','freshAir','game','superStar','car','scenery','military','fashion','sports','monthly','film','holiday','word']
        };
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.getHomeData = this.getHomeData.bind(this);
        this.jumpBannerList = this.jumpBannerList.bind(this);
        this.refreshData = this.refreshData.bind(this);
    }


    componentDidMount() {
        this.getHomeData();
    }

    /*获取首页数据*/
    getHomeData(){
        this.props.getHomeData({
            successFunc:(data)=>{
                
                this.setState({
                    carousel: data.carousel,
                    img: data.img,
                    word: data.word,
                    isRefresh: false
                })
            },
            completeFunc: ()=>{

            }
        })
    }
    refreshData(){
        this.setState({
            isRefresh: true
        });
        this.getHomeData();
    }

    /*轮播列表*/
    jumpBannerList(){
        this.props.navigation.push('BannerList')
    }
    render() {
        return <ScrollView style={styles.container}
                           refreshControl={
                               <RefreshControl
                                   refreshing={this.state.isRefresh}
                                   onRefresh={this.refreshData}
                                   title="下拉刷新"
                                   progressBackgroundColor="#ffffff"
                               />
                    }
                >
                {
                    this.state.carousel.length > 0 && <Swiper
                        showsButtons={false}
                        loop={true}
                        horizontal={true}
                        height={carouselImgHeight}
                        autoplay={true}
                        autoplayTimeout={5}
                        paginationStyle={{bottom: 0}} //小圆点的位置：距离底部10px

                    >
                        <CarouselView click={this.jumpBannerList} carousel={this.state.carousel[0]}/>
                        <CarouselView click={this.jumpBannerList} carousel={this.state.carousel[1]}/>
                        <CarouselView click={this.jumpBannerList} carousel={this.state.carousel[2]}/>
                        <CarouselView click={this.jumpBannerList} carousel={this.state.carousel[3]}/>
                        <CarouselView click={this.jumpBannerList} carousel={this.state.carousel[4]}/>
                    </Swiper>
                }

            {
                this.state.word.length >0 && <View>
                    {
                        this.state.typeName.map((item,index)=>{
                            return <View key={index}>
                                <TextView text={this.state.word[index].content}
                                          textClick={()=>{
                                              this.props.navigation.push('WordList')
                                          }} />
                                <ImageView ref="aaaa" title={item}
                                           imageUrls={this.state.img[item]} 
                                           imageList={(type)=>{
                                               this.props.navigation.push('ImageListOne',{imageType: type})
                                           }}
                                           imageDetail={(imageURL,imageOrigin)=>{

                                               
                                               let imageInfo = {
                                                   bigImageUrl: imageURL,
                                                   bigImageX: imageOrigin.x,
                                                   bigImageY: imageOrigin.y,
                                                   imageWidth: imageOrigin.width,
                                                   imageHeight: imageOrigin.height,
                                               };
                                             
                                               this.props.navigation.push('ShowBigImageDetail',{imageInfo: imageInfo})
                                               
                                           }}
                                           />
                            </View>
                        })
                    }

                </View>
            }

        </ScrollView>
    }
}

/*
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.PAGE_BG_COLOR
    },

});

function mapStateToProps(state) {
    return {
    }
}
function mapDispatchToProps(dispatch) {
    return {
        getHomeData:({successFunc:success,completeFunc: complete})=>{
            dispatch(ACTION_MIDDLEWARE_HTTP({
                url: 'onLookPicHome',
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
export default connect(mapStateToProps, mapDispatchToProps)(home)