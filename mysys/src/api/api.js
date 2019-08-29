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