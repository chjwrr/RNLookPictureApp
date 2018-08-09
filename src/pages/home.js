/**
 * Created by chj on 2018/4/17.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    View,
    Text,
    StyleSheet,
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
import Bmob from '../lib/app'

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
            typeName:['img_Pet','img_beautifulModel','img_love','img_Comic','img_freshAir','img_game','img_superStar','img_car','img_Scenery','img_Military','img_fashion','img_Sports','img_Monthly','img_Film','img_holiday','img_word']
        };
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.getBannerData = this.getBannerData.bind(this);
        this.getWordData = this.getWordData.bind(this);
        this.getTypeImage = this.getTypeImage.bind(this);
        this.jumpBannerList = this.jumpBannerList.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.dismissRefresh = this.dismissRefresh.bind(this);
    }

    componentDidMount() {
        this.refreshData()
    }

    /*获取首页数据*/
    getBannerData(){
        let bannerRandom = Math.floor(Math.random()*4324);

        const bannerQuery = Bmob.Query("famous");
        bannerQuery.limit(5); // 条数
        bannerQuery.skip(bannerRandom); // 从第几条数据开始
        bannerQuery.find().then(bannerRes => {
            console.log('banner data:', bannerRes);
           this.getWordData(bannerRes);
        }).catch((err)=>{
            console.log(err)
            this.dismissRefresh()
        });
    }
    getWordData(bannerData){
        let wordRandom = Math.floor(Math.random()*6269);
        const wordQuery = Bmob.Query("oneWord");
        wordQuery.limit(16); // 条数
        wordQuery.skip(wordRandom); // 从第几条数据开始
        wordQuery.find().then(wordRes => {
            console.log('word data:', wordRes);
            this.getTypeImage(bannerData, wordRes);
        }).catch((err)=>{
            console.log(err)
            this.dismissRefresh()
        });
    }
    getTypeImage(bannerData, wordRes){
        let petData,
             modelData,
             loveData,
             comicData,
             freshAirData,
             gameData,
             superStarData,
             carData,
             sceneryData,
             militaryData,
             fashionData,
             sportsData,
             monthlyData,
             filmData,
             holidayData,
             wordimgData;

        const imageCount = 5;
        let random =  Math.floor(Math.random()*32940);

        const loveQuery = Bmob.Query("img_love");
        loveQuery.limit(imageCount); // 条数
        loveQuery.skip(random); // 从第几条数据开始
        loveQuery.find().then(loveRes => {
            console.log('爱情：', loveRes);
            loveData = loveRes;
            const modelQuery = Bmob.Query("img_beautifulModel");
            modelQuery.limit(imageCount); // 条数
            modelQuery.skip(random); // 从第几条数据开始
            modelQuery.find().then(modelRes => {
                console.log('模特：', modelRes);
                modelData = modelRes;
                const freshQuery = Bmob.Query("img_freshAir");
                freshQuery.limit(imageCount); // 条数
                freshQuery.skip(random); // 从第几条数据开始
                freshQuery.find().then(freshRes => {
                    console.log('小清新：', freshRes);
                    freshAirData = freshRes;
                    const comicQuery = Bmob.Query("img_Comic");
                    comicQuery.limit(imageCount); // 条数
                    comicQuery.skip(random); // 从第几条数据开始
                    comicQuery.find().then(comicRes => {
                        console.log('动漫：', comicRes);
                        comicData = comicRes;
                        const superQuery = Bmob.Query("img_superStar");
                        superQuery.limit(imageCount); // 条数
                        superQuery.skip(random); // 从第几条数据开始
                        superQuery.find().then(superRes => {
                            console.log('明星：', superRes);
                            superStarData = superRes;
                            const petQuery = Bmob.Query("img_Pet");
                            petQuery.limit(imageCount); // 条数
                            petQuery.skip(random); // 从第几条数据开始
                            petQuery.find().then(petRes => {
                                console.log('萌宠：', petRes);
                                petData = petRes;
                                const gameQuery = Bmob.Query("img_game");
                                gameQuery.limit(imageCount); // 条数
                                gameQuery.skip(random); // 从第几条数据开始
                                gameQuery.find().then(gameRes => {
                                    console.log('游戏：', gameRes);
                                    gameData = gameRes;
                                    const carQuery = Bmob.Query("img_car");
                                    carQuery.limit(imageCount); // 条数
                                    carQuery.skip(random); // 从第几条数据开始
                                    carQuery.find().then(carRes => {
                                        console.log('汽车：', carRes);
                                        carData = carRes;
                                        const fashionQuery = Bmob.Query("img_fashion");
                                        fashionQuery.limit(imageCount); // 条数
                                        fashionQuery.skip(random); // 从第几条数据开始
                                        fashionQuery.find().then(fashionRes => {
                                            console.log('时尚：', fashionRes);
                                            fashionData = fashionRes;
                                            const monthlyQuery = Bmob.Query("img_Monthly");
                                            monthlyQuery.limit(imageCount); // 条数
                                            monthlyQuery.skip(random); // 从第几条数据开始
                                            monthlyQuery.find().then(monthlyRes => {
                                                console.log('月历：', monthlyRes);
                                                monthlyData = monthlyRes;
                                                const filmQuery = Bmob.Query("img_Film");
                                                filmQuery.limit(imageCount); // 条数
                                                filmQuery.skip(random); // 从第几条数据开始
                                                filmQuery.find().then(filmRes => {
                                                    console.log('影视：', filmRes);
                                                    filmData = filmRes;
                                                    const holidayQuery = Bmob.Query("img_holiday");
                                                    holidayQuery.limit(imageCount); // 条数
                                                    holidayQuery.skip(random); // 从第几条数据开始
                                                    holidayQuery.find().then(holidayRes => {
                                                        console.log('节日：', holidayRes);
                                                        holidayData = holidayRes;
                                                        const militaryQuery = Bmob.Query("img_Military");
                                                        militaryQuery.limit(imageCount); // 条数
                                                        militaryQuery.skip(random); // 从第几条数据开始
                                                        militaryQuery.find().then(militaryRes => {
                                                            console.log('军事：', militaryRes);
                                                            militaryData = militaryRes;
                                                            const sportQuery = Bmob.Query("img_Sports");
                                                            sportQuery.limit(imageCount); // 条数
                                                            sportQuery.skip(random); // 从第几条数据开始
                                                            sportQuery.find().then(sportRes => {
                                                                console.log('运动：', sportRes);
                                                                sportsData = sportRes;
                                                                const wordQuery = Bmob.Query("img_word");
                                                                wordQuery.limit(imageCount); // 条数
                                                                wordQuery.skip(random); // 从第几条数据开始
                                                                wordQuery.find().then(onWordRes => {
                                                                    console.log('文字：', onWordRes);
                                                                    wordimgData = onWordRes;
                                                                    const sceneryQuery = Bmob.Query("img_Scenery");
                                                                    sceneryQuery.limit(imageCount); // 条数
                                                                    sceneryQuery.skip(random); // 从第几条数据开始
                                                                    sceneryQuery.find().then(sceneryRes => {
                                                                        console.log('风景：', sceneryRes);
                                                                        sceneryData = sceneryRes;
                                                                        let img = {
                                                                            img_Pet: petData,
                                                                            img_beautifulModel: modelData,
                                                                            img_love: loveData,
                                                                            img_Comic: comicData,
                                                                            img_freshAir: freshAirData,
                                                                            img_game: gameData,
                                                                            img_superStar: superStarData,
                                                                            img_car: carData,
                                                                            img_Scenery: sceneryData,
                                                                            img_Military: militaryData,
                                                                            img_fashion: fashionData,
                                                                            img_Sports: sportsData,
                                                                            img_Monthly: monthlyData,
                                                                            img_Film: filmData,
                                                                            img_holiday: holidayData,
                                                                            img_word: wordimgData
                                                                        };

                                                                        this.setState({
                                                                            carousel: bannerData,
                                                                            img: img,
                                                                            word: wordRes,
                                                                            isRefresh: false
                                                                        })

                                                                    }).catch((err)=>{
                                                                        console.log(err)
                                                                        this.dismissRefresh()
                                                                    });
                                                                }).catch((err)=>{
                                                                    console.log(err)
                                                                    this.dismissRefresh()
                                                                });
                                                            }).catch((err)=>{
                                                                console.log(err)
                                                                this.dismissRefresh()
                                                            });
                                                        }).catch((err)=>{
                                                            console.log(err)
                                                            this.dismissRefresh()
                                                        });
                                                    }).catch((err)=>{
                                                        console.log(err)
                                                        this.dismissRefresh()
                                                    });
                                                }).catch((err)=>{
                                                    console.log(err)
                                                    this.dismissRefresh()
                                                });
                                            }).catch((err)=>{
                                                console.log(err)
                                                this.dismissRefresh()
                                            });
                                        }).catch((err)=>{
                                            console.log(err)
                                            this.dismissRefresh()
                                        });
                                    }).catch((err)=>{
                                        console.log(err)
                                        this.dismissRefresh()
                                    });
                                }).catch((err)=>{
                                    console.log(err)
                                    this.dismissRefresh()
                                });
                            }).catch((err)=>{
                                console.log(err)
                                this.dismissRefresh()
                            });
                        }).catch((err)=>{
                            console.log(err)
                            this.dismissRefresh()
                        });
                    }).catch((err)=>{
                        console.log(err)
                        this.dismissRefresh()
                    });
                }).catch((err)=>{
                    console.log(err)
                    this.dismissRefresh()
                });

            }).catch((err)=>{
                console.log(err)
                this.dismissRefresh()
            });
        }).catch((err)=>{
            console.log(err)
            this.dismissRefresh()
        });
    }

    dismissRefresh(){
        this.setState({
            isRefresh: true
        });
    }
    refreshData(){
        this.setState({
            isRefresh: true
        });
        this.getBannerData();
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
                                <ImageView title={item}
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