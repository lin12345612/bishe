// 加载头像链接
export function handleLogo(name){
    let _src = '';
    switch(name){
        case '火箭':
            _src = '../../images/logo/rocket.svg';
            break;
        case '马刺':
            _src = '../../images/logo/spurs.svg';
            break;
        case '灰熊':
            _src = '../../images/logo/grizzlies.svg';
            break;
        case '鹈鹕':
            _src = '../../images/logo/pelican.svg';
            break;
        case '独行侠':
            _src = '../../images/logo/mavericks.svg';
            break;
        case '勇士':
            _src = '../../images/logo/warrior.svg';
            break;
        case '快船':
            _src = '../../images/logo/clipper.svg';
            break;
        case '国王':
            _src = '../../images/logo/king.svg';
            break;
        case '湖人':
            _src = '../../images/logo/laker.svg';
            break;
        case '太阳':
            _src = '../../images/logo/suns.svg';
            break;
        case '掘金':
            _src = '../../images/logo/nuggets.svg';
            break;
        case '开拓者':
            _src = '../../images/logo/blazers.svg';
            break;
         case '爵士':
            _src = '../../images/logo/jazz.svg';
            break;
        case '雷霆':
            _src = '../../images/logo/thunder.svg';
            break;
        case '森林狼':
            _src = '../../images/logo/timberwolves.svg';
            break;
        case '猛龙':
            _src = '../../images/logo/raptors.svg';
            break;
        case '76人':
            _src = '../../images/logo/76ers.svg';
            break;
        case '凯尔特人':
            _src = '../../images/logo/celtics.svg';
            break;
        case '篮网':
            _src = '../../images/logo/nets.svg';
            break;
        case '尼克斯':
            _src = '../../images/logo/knicks.svg';
            break;
        case '魔术':
            _src = '../../images/logo/magic.svg';
            break;
        case '黄蜂':
            _src = '../../images/logo/hornets.svg';
            break;
        case '活塞':
            _src = '../../images/logo/pistons.svg';
            break;
        case '热火':
            _src = '../../images/logo/heat.svg';
            break;
        case '奇才':
            _src = '../../images/logo/wizards.svg';
            break;
        case '老鹰':
            _src = '../../images/logo/hawks.svg';
            break;
        case '雄鹿':
            _src = '../../images/logo/bucks.svg';
            break;
         case '步行者':
            _src = '../../images/logo/pacers.svg';
            break;
        case '公牛':
            _src = '../../images/logo/bulls.svg';
            break;
        case '骑士':
            _src = '../../images/logo/cavaliers.svg';
            break;
    }
    return _src;
}
export function loadImg(url){
    return new Promise((resolve,reject) =>{
        var image = new Image();
        image.onload = function(){
            resolve()
        }
        image.onerror = function(){
            reject('图片加载失败')
        }
        image.src = url;
    })
}
