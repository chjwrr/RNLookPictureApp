/**
 * Created by chj on 2018/7/30.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    FlatList,
    Clipboard
} from 'react-native';
import {connect} from 'react-redux';

import PureRenderMixin from 'react-addons-pure-render-mixin';
import Immutable from 'immutable';
import WordTopItem from '../comment/wordList/wordTopItem';
import LinearGradient from 'react-native-linear-gradient'
import {ACTION_MIDDLEWARE_HTTP} from '../action/action';
import Toast from '@remobile/react-native-toast';

const {width, height} = Dimensions.get('window');

class wordList extends Component<{}> {

    constructor(props){
        super(props);
        this.state = {
            jokeColors: ['#C6E2FF','#FFFFE0','#BFEFFF'],
            shuoColors: ['#FFFFE0','#FFF0F5','#FFB6C1'],
            currentColors: ['#C6E2FF','#FFFFE0','#BFEFFF'],
            jokeSource: [],
            shuoSource: [],
            dataSource: [],
            isRefresh: false,
            currentIndex: 0
        };
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.topClick = this.topClick.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.endReached = this.endReached.bind(this);
        this.refreshData = this.refreshData.bind(this);
        this.getJokeData = this.getJokeData.bind(this);
        this.getShuoData = this.getShuoData.bind(this);
    }

    componentDidMount() {
        this.getJokeData();
    }
    /*top item click*/
    topClick(index){
        this.setState({
            currentColors: index === 0 ? this.state.jokeColors : this.state.shuoColors,
            currentIndex: index
        });
        if (index === 0){
            this.setState({
                dataSource: this.state.jokeSource
            })
        }else {
            if (this.state.shuoSource.length === 0){
                this.getShuoData()
            }else
                this.setState({
                    dataSource: this.state.shuoSource
                })
        }
    }

    /*flatList Item*/
    renderItem({ index, item }){
        return (
            <View style={{marginBottom: 15}}>
                <Text onLongPress={()=>{
                    Clipboard.setString(item.content);
                    Toast.showShortCenter('内容已复制')
                }} style={{lineHeight:18,marginHorizontal: 10}}>{item.content}</Text>
                <View style={{height: 5, backgroundColor: 'rgba(255,255,255,0.8)',marginTop: 15}}/>
            </View>
        )
    }
    //获取笑话列表数据
    getJokeData(type){
        this.props.getJokeData({
            successFunc: (data)=>{
                if (type === 'refresh'){
                    this.setState({
                        jokeSource:data
                    },()=>{
                        this.setState({
                            dataSource: this.state.jokeSource
                        })
                    })
                }else {
                    this.setState({
                        jokeSource:this.state.jokeSource.concat(data)
                    },()=>{
                        this.setState({
                            dataSource: this.state.jokeSource
                        })
                    })
                }

            },
            completeFunc:()=>{
                this.setState({
                    isRefresh: false
                })
            }
        })
    }
    //获取说说列表数据
    getShuoData(type){
        this.props.getShuoData({
            successFunc: (data)=>{
                if (type === 'refresh'){
                    this.setState({
                        shuoSource:data
                    },()=>{
                        this.setState({
                            dataSource: this.state.shuoSource
                        })
                    })
                }else {
                    this.setState({
                        shuoSource:this.state.shuoSource.concat(data)
                    },()=>{
                        this.setState({
                            dataSource: this.state.shuoSource
                        })
                    })
                }
            },
            completeFunc:()=>{
                this.setState({
                    isRefresh: false
                })
            }
        })
    }
    /*下拉刷新*/
    refreshData(){
        if (this.state.currentIndex === 0){
            this.getJokeData('refresh')
        }else {
            this.getShuoData('refresh')
        }
    }

    /*加载更多*/
    endReached(){
        if (this.state.currentIndex === 0){
            this.getJokeData()
        }else
            this.getShuoData()
    }

    render() {
        return (
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                            colors={this.state.currentColors}
                            style={styles.container}>
                <WordTopItem topClick={(index)=>{this.topClick(index)}}
                             leftBtnClick={()=>{
                                 this.props.navigation.pop()
                             }}
                />
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
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width,
        height
    },
});

function mapStateToProps(state) {

    return {

    };

}

function mapDispatchToProps(dispatch) {
    return {
        getJokeData:({successFunc:success,completeFunc: complete})=>{
            dispatch(ACTION_MIDDLEWARE_HTTP({
                url: 'onRequestJoke',
                loading:()=>{},
                success:(data)=>{
                    success(data)
                },
                fail:()=>{},
                complete:()=>{
                    complete()
                }
            }))
        },
        getShuoData:({successFunc:success,completeFunc: complete})=>{
            dispatch(ACTION_MIDDLEWARE_HTTP({
                url: 'onRequestOneWord',
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

export default connect(mapStateToProps, mapDispatchToProps)(wordList);