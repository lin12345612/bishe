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