module.exports = {
    //获取东西部排名
    getTeamRank : 'SELECT tName, wNum,fNum,rate,states FROM teaminfor WHERE wNum != "" AND part="西部" ORDER BY ranks ASC;SELECT tName, wNum,fNum,rate,states FROM teaminfor WHERE wNum != "" AND part="东部" ORDER BY ranks ASC',
    // 一开始加载球员各项数据
    getPlayerData : 
    `
    SELECT player,tName,points,imgSrc FROM playerinfor WHERE points != ""  ORDER BY points DESC LIMIT 0,10;
    SELECT player,tName,reb,imgSrc FROM playerinfor WHERE points != ""  ORDER BY reb DESC LIMIT 0,10;
    SELECT player,tName,assist,imgSrc FROM playerinfor WHERE points != ""  ORDER BY assist DESC LIMIT 0,10;
    SELECT player,tName,steal,imgSrc FROM playerinfor WHERE points != ""  ORDER BY steal DESC LIMIT 0,10;
    SELECT player,tName,block,imgSrc FROM playerinfor WHERE points != ""  ORDER BY block DESC LIMIT 0,10
    `,
    // 球员各项数据翻页  参数1：单项名称  参数2：第几页
    getSingleDataPage : function(item1,page1){
        return `SELECT player,tName,${item1} FROM playerinfor WHERE ${item1} != ""  ORDER BY ${item1} DESC LIMIT ${page1},10`
    },
    //现役球员个人生涯情况
    getplayerCareer : function(player,team){
        return `
        SELECT number,height,weight,rookie,imgSrc,contract,picLink FROM playerinfor WHERE player="${player}" AND tName="${team}" AND number IS NOT NULL;
        SELECT  preteam,season,cpoint,creb,cassist,csteal,cblock,avedata FROM playerinfor WHERE player="${player}" AND tName="${team}" AND preteam IS NOT NULL;
        SELECT honor FROM playerinfor WHERE player="${player}" AND tName="${team}" AND honor IS NOT NULL;
        `
    },
    // 获取球队信息
    getTeamInfor:
    `SELECT logoSrc FROM teaminfor WHERE logoSrc IS NOT NULL AND tName=?;
     SELECT wNum,fNum,states,tDes,coach,groupName,ranks,part FROM teaminfor WHERE wNum IS NOT NULL AND tName=?;
     SELECT player,number,imgSrc FROM teaminfor WHERE tName=?;
     SELECT newSrc,newTitle FROM teaminfor WHERE tName=? AND newSrc IS NOT NULL;
     `,

    // 查询球员名字
    searchName:function(name){
        return `SELECT player,tName FROM playerinfor WHERE imgSrc IS NOT NULL AND player LIKE "%${name}%";`
    },
    // 查询比赛
    searchGame:function(time){
        return `SELECT * FROM teamscheme WHERE pDate="${time}";`},

    // 插入验证码
    insertCode : function(user,num){
        return `INSERT INTO user(mail,code,psw) VALUES("${user}","${num}",'');`
    },
    // 更新验证码
    updateCode : function(user,num){
        return `UPDATE user SET code="${num}" WHERE mail="${user}"; `
    },
    // 判断邮箱是否存在
    checkAccount : 'SELECT mail FROM user WHERE mail=?',
    // 校验验证码
    checkCode: 'SELECT code FROM user WHERE mail=?',
    // 更新用户数据，传入密码
    upDateUser : 'UPDATE user SET psw= ? WHERE mail=?;'

}