import request from '@/utils/request';


// 获取球队排名信息
export function getTeamRank(){
    return request({
        url : '/api/getTeamRank',
        method:'get'
    })
}