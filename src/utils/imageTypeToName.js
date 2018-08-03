/**
 * Created by chj on 2018/7/25.
 */


/*首页图片分类名称转义*/
export default imageTypeToName = (type)=>{
    let anme = '';

    switch (type){
        case 'pet':
            name = '宠物';
            break;
        case 'model':
            name = '模特';
            break;
        case 'love':
            name = '爱情';
            break;
        case 'comic':
            name = '动漫';
            break;
        case 'freshAir':
            name = '小清新';
            break;
        case 'game':
            name = '游戏';
            break;
        case 'superStar':
            name = '明星';
            break;
        case 'car':
            name = '汽车';
            break;
        case 'scenery':
            name = '风景';
            break;
        case 'military':
            name = '军事';
            break;
        case 'fashion':
            name = '时尚';
            break;
        case 'sports':
            name = '运动';
            break;
        case 'monthly':
            name = '月历';
            break;
        case 'film':
            name = '影视';
            break;
        case 'holiday':
            name = '节日';
            break;
        case 'word':
            name = '文字';
            break;
        default:
            break
    }
    return name;
};
