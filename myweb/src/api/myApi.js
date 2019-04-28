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