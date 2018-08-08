/**
 * Created by chj on 2018/7/25.
 */


/*首页图片分类名称转义*/
export default imageTypeToName = (type)=>{
    let anme = '';

    switch (type){
        case 'img_Pet':
            name = '宠物';
            break;
        case 'img_beautifulModel':
            name = '模特';
            break;
        case 'img_love':
            name = '爱情';
            break;
        case 'img_Comic':
            name = '动漫';
            break;
        case 'img_freshAir':
            name = '小清新';
            break;
        case 'img_game':
            name = '游戏';
            break;
        case 'img_superStar':
            name = '明星';
            break;
        case 'img_car':
            name = '汽车';
            break;
        case 'img_Scenery':
            name = '风景';
            break;
        case 'img_Military':
            name = '军事';
            break;
        case 'img_fashion':
            name = '时尚';
            break;
        case 'img_Sports':
            name = '运动';
            break;
        case 'img_Monthly':
            name = '月历';
            break;
        case 'img_Film':
            name = '影视';
            break;
        case 'img_holiday':
            name = '节日';
            break;
        case 'img_word':
            name = '文字';
            break;
        default:
            break
    }
    return name;
};
