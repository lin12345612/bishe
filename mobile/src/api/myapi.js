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