/**
 * Created by chj on 2018/4/17.
 */
import {createBottomTabNavigator} from "react-navigation";
import TabbarRoot from './tabbar'
const Tabbar = createBottomTabNavigator(TabbarRoot.AppRootTabBarRouteConfigs, TabbarRoot.AppRootTabBarNavigatorConfigs);

import Home from './pages/home';
import ImageListOne from './pages/imageListOne';
import BannerList from './pages/bannerList';
import WordList from './pages/wordList';
import ShowBigImageDetail from './pages/showBigImageDetail';

const AppNavigationRouterConfigs = {
    Home: {
        screen: Home,
        navigationOptions:{
            header: null
        }
    },
    ImageListOne: {
        screen: ImageListOne,
        navigationOptions:{
            header: null
        }
    },
    BannerList: {
        screen: BannerList,
        navigationOptions:{
            header: null
        }
    },
    WordList: {
        screen :WordList,
        navigationOptions:{
            header: null
        }
    },
    ShowBigImageDetail: {
        screen :ShowBigImageDetail,
        navigationOptions:{
            header: null
        }
    }
};
const AppNavigationStackConfigs = {
    initialRouteName: 'Home',
    mode: 'card',
    headerMode: 'screen',
    onTransitionStart:(()=>{
        console.log('onTransitionStart');
    }),
    onTransitionEnd: (()=>{
        console.log('onTransitionEnd');
    }),
};
export default {
    AppNavigationRouterConfigs,
    AppNavigationStackConfigs
}

