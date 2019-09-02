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

// 上传球员头像
export function uploadPlayerTx(formd){
    return service({
        url : '/api/sysuploadPlayerTx',
        method:'post',
        data:formd,
        headers : {'Content-type':'multipart/form-data'}
    })
}

// 获取球员荣誉
export function getPlayerHonor(pid){
    return service({
        url : '/api/sysGetPlayerHonor',
        method:'get',
        params : {
            pid
        }
    })
}
// 新增球员荣誉
export function addPlayerHonor(pid,honorArr){
    return service({
        url : '/api/sysAddPlayerHonor',
        method:'post',
        data:{
           pid,honorArr
        }
    })
}
// 删除球员荣誉
export function delPlayerHonor(rid){
    return service({
        url : '/api/sysDelPlayerHonor',
        method:'post',
        data:{
           rid
        }
    })
}

// 获取球员生涯数据
export function getPlayerCareer(pid){
    return service({
        url : '/api/sysGetPlayerCareer',
        params:{
            pid
        }
    })
}

// 传sql语句到后台
export function sendSql(sqlStr){
    return service({
        url : '/api/sysGetSql',
        method:'post',
        data:{
           sqlStr
        }
    })
}

// 删除球员生涯数据
export function delPlayerCareer(sid){
    return service({
        url : '/api/sysDelPlayerCareer',
        method:'post',
        data:{
           sid
        }
    })
}