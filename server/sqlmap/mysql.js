module.exports = {
    //获取东西部排名以及所有球队
    getTeamRank : `
        SELECT tid,fName,tName,wNum,fNum,rate,states,logoSrc FROM teaminfor WHERE part="西部" ORDER BY ranks ASC;
        SELECT tid,fName,tName,wNum,fNum,rate,states,logoSrc FROM teaminfor WHERE part="东部" ORDER BY ranks ASC;
    `,
    // 一开始加载球员各项数据
    getPlayerData : 
    `
    SELECT pid,player,tid,imgSrc,points FROM playerinfor ORDER BY points desc LIMIT 0,10;
    SELECT pid,player,tid,imgSrc,reb FROM playerinfor ORDER BY reb desc LIMIT 0,10;
    SELECT pid,player,tid,imgSrc,assist FROM playerinfor ORDER BY assist desc LIMIT 0,10;
    SELECT pid,player,tid,imgSrc,steal FROM playerinfor ORDER BY steal desc LIMIT 0,10;
    SELECT pid,player,tid,imgSrc,block FROM playerinfor ORDER BY block desc LIMIT 0,10;
    `,
    // 球员各项数据翻页  参数1：单项名称  参数2：第几个开始
    getSingleDataPage : function(item1,page1){
        return `SELECT pid,player,tid,${item1} FROM playerinfor ORDER BY ${item1} DESC LIMIT ${page1},10`
    },
    // 球员各项数据加载：参数1：单项名称，参数2：第几个开始，参数3：每次加载个数
    getSingleDataByParams:function(item1,page1,num){
        return `SELECT pid,player,tid,imgSrc,${item1} as sjlx FROM playerinfor ORDER BY ${item1} DESC LIMIT ${page1},${num}`
    },
    //现役球员个人生涯情况
    getplayerCareer : function(pid){
        return `
        SELECT player,tid,points,reb,assist,steal,block,number,height,weight,rookie,imgSrc,contract,picLink FROM playerinfor WHERE pid=${pid};
        select preTeam,season,cPoint,cReb,cAssist,cSteal,cBlock,aveData FROM playercareer WHERE pid=${pid} ORDER BY sid DESC;
        select honor FROM playerhonor WHERE pid=${pid};
        `
    },
    // 获取球队信息
    getTeamInfor:
        `SELECT fName,wNum,fNum,states,logoSrc,part,logoSrc,tDes,coach,groupName,ranks FROM teaminfor WHERE tid=?;
        SELECT pid,player,imgSrc,number from playerinfor where tid=?;
        SELECT newTitle,newSrc FROM teamnews WHERE tid=? ORDER BY keyid DESC LIMIT 0,8;
        `,

    // 查询球员名字
    searchName:function(name){
        return `SELECT player,pid FROM playerinfor WHERE player LIKE "%${name}%";`
    },
    // 查询比赛
    searchGame:function(time){
        return `SELECT * FROM teamscheme WHERE pDate between '${time} 00:00:00' and '${time} 23:59:59'; `},

    // 插入验证码
    insertCode : function(user,num){
        return `INSERT INTO user(mail,code,xhqd,txSrc,xhqx,psw,selected,mmstr,nickname) VALUES("${user}","${num}",'',null,'','','undone',null,null);`
    },
    // 更新验证码
    updateCode : function(user,num){
        return `UPDATE user SET code="${num}" WHERE mail="${user}"; `
    },
    // 判断邮箱是否存在
    checkAccount : 'SELECT mail,psw FROM user WHERE mail=?',
    // 校验验证码
    checkCode: 'SELECT code FROM user WHERE mail=?',
    // 更新用户密码或传入密码
    upDateUser : 'UPDATE user SET psw= ?,mmstr=? WHERE mail=?;',
    
    // 用户登录---账号
    login:'select psw,txSrc,xhqx,xhqd,selected,mmstr,nickname from user where mail=?',
    // 获取用户喜欢的球员数据
    favoPlayerInfor:function(pid){
        return `SELECT pid,tid,player,imgSrc,points,reb,assist,qyzt FROM playerinfor WHERE pid=${pid};`;
    },
    // 获取用户喜欢的球队数据
    favoTeamInfor:function(tid){
        return `SELECT tid,tName,part,wNum,fNum,ranks,logoSrc FROM teaminfor WHERE tid="${tid}";`
    },

    // 更新所选球员和球队
    selectedDone:function(p1,p2,p3){
        return `UPDATE  user SET xhqx="${p1}",xhqd="${p2}",selected="done" where mail="${p3}"; `
    },
    // 查询头像以及更新头像
    getUpdateSrc : function(src,user){
        return `UPDATE user SET txSrc="${src}" WHERE mail="${user}"; `
    },
    // 移动端查询比赛select * FROM teamscheme WHERE done != "否" ORDER BY scKey DESC LIMIT 0,7;
    getScheme:function(page){
        return `select pDate,hTeam,rTeam,splj,tjlj,hScore,rScore FROM teamscheme WHERE done != "否" ORDER BY pDate DESC LIMIT ${page},3;`
    },
    // 查询球队新闻
    getTeamNews:function(tn,page){
        return `SELECT newSrc,newTitle FROM teamnews WHERE tid="${tn}" ORDER BY keyid DESC LIMIT ${page},8;`
    },
    // 获取热门球星
    getHotPlayer:'SELECT player,pid from hotplayer ;',
    // 获取球队信息
    getPlayerByTeam:function(qd){
        return `SELECT pid,player FROM playerinfor WHERE tid="${qd}";`
    },
    // 修改昵称
    modifyNc :`UPDATE user SET nickname=? WHERE mail=?;`,
    // 记录留言
    recordMessage:`INSERT INTO fankui(opinion) VALUES(?);`,
    // 获取球星信息
    getPlayerInfor:function(str){
        return `select pid,player,tid,imgSrc FROM playerinfor WHERE pid IN ${str};`
    },
    // 更新喜欢球员
    updateLikePlayer:function(xhqx,user){
        let _qx =  xhqx ? `'${xhqx}'` : null 
        return `UPDATE user SET xhqx=${_qx} WHERE mail='${user}'; `
    },
    // 更新喜欢的球队
    updateMyTeam:function(xhqd,user){
        let _qd = xhqd ? `'${xhqd}'`:null
        return `UPDATE user SET xhqd=${_qd} WHERE mail='${user}'; `
    },

    // 后台部分
    // 查询球员信息
    sysSearchPlayerByName(name){
        return `select pid,player,qyzt,tid,number,height,weight,rookie,contract,imgSrc FROM playerinfor WHERE player LIKE '%${name}%';`
    },
    sysSearchPlayerByTeam(tid){
        return `SELECT pid,player,qyzt,tid,number,height,weight,rookie,contract,imgSrc FROM playerinfor WHERE tid='${tid}';`
    },
    // 新增球员
    sysAddPlayer(player,qyzt,tid,number,height,weight,rookie,contract,imgSrc){
        let _img = imgSrc ? `'${imgSrc}'` : null;
        let _tid = tid? `'${tid}'`:null
        return `INSERT INTO playerinfor(player,qyzt,tid,points,reb,assist,steal,block,number,height,weight,rookie,contract,picLink,imgSrc) VALUES('${player}',${qyzt},${_tid},0,0,0,0,0,'${number}',${height},${weight},'${rookie}','${contract}',NULL,${_img});`
    },
    // 修改球员信息
    sysModifyPlayer(pid,player,qyzt,tid,number,height,weight,rookie,contract,imgSrc){
        let _img = imgSrc ? `'${imgSrc}'` : null;
        let _tid = tid? `'${tid}'`:null
        return `UPDATE playerinfor SET player='${player}',qyzt=${qyzt},tid=${_tid},number='${number}',height=${height},weight=${weight},rookie='${rookie}',contract='${contract}',imgSrc=${_img} WHERE pid = ${pid};`
    },
    // 获取球员id
    sysGetPlayerId(player,tid){
        let _tid = tid? `'${tid}'`:null;
        return `SELECT pid FROM playerInfor WHERE player='${player}' AND tid=${_tid}`
    },
    // 获取球员荣誉
    sysGetPlayerHonor(pid){
        return `SELECT rid,honor FROM playerhonor WHERE pid=${pid};`;
    },
    // 新增球员荣誉
    sysAddPlayerHonor(str){
        return `INSERT INTO playerhonor(pid,honor) VALUES ${str}`;
    },
    // 删除球员荣誉
    sysDeletePlayerHonor(rid){
        return `DELETE FROM playerhonor WHERE rid=${rid};`
    },
    // 获取球员生涯数据
    sysGetPlayerCareer(pid){
        return `SELECT sid,preTeam,season,cPoint,cReb,cSteal,cAssist,cBlock,aveData FROM playercareer WHERE pid=${pid} ORDER BY sid DESC;`
    },
    // 删除球员生涯数据
    sysDelPlayerCareer(sid){
        return `DELETE FROM playercareer WHERE sid=${sid};`;
    }

}