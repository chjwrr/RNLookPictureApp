/**
 * Created by chj on 2018/7/25.
 */
/*************************************************导航栏相关*************************************************************/
import DeviceInfo from 'react-native-device-info';

export const is_iPhoneX             = DeviceInfo.getModel() === 'iPhone X';

export const Tabbar_Height          = (is_iPhoneX ? 34 + 49 : 49);

export const Tabbar_marginBottom    = (is_iPhoneX ? 34 : 0);

export const NavigationBar_Height   = 44;

export const StatusBar_Height       = (is_iPhoneX ? 44 : 20);


/*首页轮播图高度*/
export const carouselImgHeight = 200;

/*首页图片类型高度*/
export const carouselTypeImgHeight = 100;



/*************************************************图片分类列表相关********************************************************/

export const imageListSpace = 5;
