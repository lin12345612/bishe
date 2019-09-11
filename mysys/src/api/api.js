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

// 获取球队信息
export function getTeamInfor(team){
    return service({
        url : '/api/getTeamInfor',
        method:'post',
        data:{
            team
        }
    })
}

// 修改球队信息
export function modifyTeam(sid,part,tid,fName,tName,wNum,fNum,rate,ranks,states,logoSrc,tDes,coach,groupName){
    return service({
        url : '/api/sysOperaTeam',
        method:'post',
        data:{
           sid,part,tid,fName,tName,wNum,fNum,rate,ranks,states,logoSrc,tDes,coach,groupName
        }
    })
}

// 查询球队新闻
export function getTeamNews(team,page){
    return service({
        url : '/api/getTeamNews',
        method:'post',
        data:{
           team,page
        }
    })
}

// 删除新闻
export function delNews(keyid){
    return service({
        url : '/api/sysDelNews',
        method:'post',
        data:{
           keyid
        }
    })
}

// 获取赛程
export function getScheme(page){
    return service({
        url : '/api/sysGetScheme',
        method:'get',
        params:{
           page
        }
    })
}

// 筛选赛程
export function filterScheme(time){
    return service({
        url : '/api/sysFilterScheme',
        method:'get',
        params:{
           time
        }
    })
}

// 删除赛程
export function delScheme(delArr){
    return service({
        url : '/api/sysDelScheme',
        method:'post',
        data:{
           delArr
        }
    })
}

// 获取留言
export function getMessage(page){
    return service({
        url : '/api/sysGetMessage',
        method:'get',
        params:{
           page
        }
    })
}

// 热门球星
export function getWelPlayer(){
    return service({
        url : '/api/getHotPlayer',
    })
}

// 设置热门球星
export function setWelPlayer(pid,player){
    return service({
        url : '/api/sysSetWelPlayer',
        method:'post',
        data:{
           pid,player
        }
    })
}

// 取消设置热门球星
export function cancelWelPlayer(sid){
    return service({
        url : '/api/sysCancelPlayer',
        method:'post',
        data:{
           sid
        }
    })
}

// 获取用户
export function getUser(page){
    return service({
        url : '/api/sysGetUser',
        method:'get',
        params:{
            page
        }
    })
}