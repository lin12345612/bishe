import request from '@/utils/request';


// 获取球队排名信息
export function getTeamRank(){
    return request({
        url : '/api/getTeamRank',
        method:'get'
    })
}

// 获取球队信息
export function getTeamInfor(team){
    return request({
        url : '/api/getTeamInfor',
        method:'post',
        params:{team:team}
    })
}

// 加载各项数据前十名
export function getTopTen(){
    return request({
        url : '/api/getTopten',
        method:'get'
    })
}
// 加载单项数据
export function getSingleData(dxData){
    return request({
        url:'/api/getSingleData',
        method:'post',
        params:{
            item:dxData.item,
            offset:dxData.offset
        }
    })
}

// 查询球员名字
export function searchName(name){
    return request({
        url : '/api/searchName',
        method:'post',
        params:{
            name :name
        }
    })
}

// 查询球员信息
export function getPlayerInfor(qy){
    return request({
        url : '/api/getPlayerInfor',
        method:'post',
        params:{
            player : qy.name,
            team : qy.team
        }
    })
}

// 获取比赛情况
export function getScheme(date){
    return request({
        url : '/api/searchGame',
        method:'post',
        params:{
            time:date
        }
    })
}
// 查看邮箱是否存在
export function checkAccount(user){
    return request({
        url :'/api/checkAccount',
        method : 'post',
        params : {
            user : user
        }
    })
}
// 点击发送验证码
export function sendCode(user){
    return request({
        url : '/api/createCode',
        method:'post',
        params:{
            user:user
        }
    })
}

// 发送账号密码验证码到后台
export function checkCode(info){
    return request({
        url : '/api/checkCodeAndRegi',
        method : 'post',
        params:{
            user : info.user,
            psw : info.psw,
            code : info.code
        }
    })
}