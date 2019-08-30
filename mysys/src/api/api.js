import axios from 'axios';
const service = axios.create({
    timeout:5000
})

// 首页登录
export function login(user,psw){
    return service({
        url : '/api/sysLogin',
        method:'post',
        data:{
            user,psw
        }
    })
} 
// 获取球队信息
export function getTeam(){
    return service({
        url : '/api/getTeamRank'
    })
}
// 查找球员--通过名字
export function searchPlayerByName(player){
    return service({
        url : '/api/sysSearchPlayerByName',
        method:'post',
        data:{
            player
        }
    })
}

// 查找球员 --通过球队
export function searchPlayerByTeam(tid){
    return service({
        url : '/api/sysSearchPlayerByTeam',
        method:'post',
        data:{
            tid
        }
    })
}
// 保存修改球员
export function operaPlayer(pid,player,tid,qyzt,number,height,weight,rookie,contract,imgSrc){
    return service({
        url : '/api/sysOperaPlayer',
        method:'post',
        data:{
            pid,player,tid,qyzt,number,height,weight,rookie,contract,imgSrc
        }
    })
}