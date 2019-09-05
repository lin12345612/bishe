import request from '@/utils/request.js';

// 获取比赛列表
export function getScheme(page){
    return request({
        url : '/api/getScheme',
        method:'post',
        params:{
            page : page
        }
    })
}
// 获取球队排名
export function getRank(){
    return request({
        url : '/api/getTeamRank'
    })
}
// 获取各项数据前10
export function getSingleData(data){
    return request({
        url : '/api/getDataByparams',
        method:'post',
        data
    })
}

// 获取球队信息
export function getTeamInfor(dm){
    return request({
        url : '/api/getTeamInfor',
        method : 'post',
        data:{
            team : dm
        }
    })
}
// 获取球队新闻
export function getTeamNews(qd,ys){
    return request({
        url :'/api/getTeamNews',
        method:'post',
        data:{
            team:qd,
            page : ys
        }
    })
}
// 获取热门球星
export function getHotPlayer(){
    return request({
        url:'/api/getHotPlayer'
    })
}
// 根据球队获取球星
export function getPlayerByTeam(qd){
    return request({
        url : '/api/getPlayerByTeam',
        method:'post',
        data:{
            team : qd
        }
    })
}
// 搜索球员名字
export function getPlayerBySearch(qx){
    return request({
        url :'/api/searchName',
        method:'post',
        data:{
            name:qx
        }
    })
}
// 获取球员信息
export function getPlayerInfor(xx){
    return request({
        url :'/api/getPlayerInfor',
        method:'post',
        data:{
            pid :xx
        }
    })
}

// 判断邮箱是否存在
export function checkAccount(yx){
    return request({
        url : '/api/checkAccount',
        data : {
            user :yx
        },
        method : 'post'
    })
}

// 获取验证码
export function regiGetCode(user,flag){
    return request({
        url : '/api/createCode',
        data:{
            user : user,
            exist :flag
        },
        method:'post'
    })
}

// 注册
export function register(user,psw,code){
    return request({
        url : '/api/checkCodeAndRegi',
        data:{
            user : user,
            psw :psw,
            code : code
        },
        method:'post'
    })
}
// 修改密码
export function resetpsw(user,psw,code){
    return request({
        url : '/api/mobileResetPsw',
        method:'post',
        data:{
            user : user ,
            psw : psw,
            code : code 
        }
    })
}

// 登录
export function login(user,psw){
    return request({
        url : '/api/mobileLogin',
        method:'post',
        data:{
            user : user ,
            psw : psw
        }
    })
}

// 修改头像
export function modifyTx(data){
    return request({
        url : '/api/upload',
        method:'post',
        data
    })
}

// 修改昵称
export function modifyNc(user,nc){
    return request({
        url : '/api/modifyNc',
        method:'post',
        data:{
            user,nc
        }
    })
}

// 修改密码
export function modifyPsw(user,oldpsw,newpsw){
    return request({
        url : '/api/modifyPsw',
        method:'post',
        data:{
            user,oldpsw,newpsw
        }
    })
}

// 留言反馈
export function recordMessage(opinion){
    return request({
        url : '/api/recordMessage',
        method:'post',
        data:{
            opinion
        }
    })
}

// 获取喜欢球员信息
export function getXhPlayerInfor(xhqx){
    return request({
        url : '/api/getLikePlayerInfor',
        method:'post',
        data:{
            xhqx
        }
    })
}

// 修改以及获取球员信息
export function updateAndGetPlayer(user,playArr){
    return request({
        url : '/api/updateAndGetPlayer',
        method:'post',
        data:{
            user,playArr
        }
    })
}

// 更新喜欢的球队
export function updateMyteam(user,likeArr){
    return request({
        url : '/api/updateMyTeam',
        method:'post',
        data:{
            likeArr,user
        }
    })
}