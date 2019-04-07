module.exports = {
    //获取东西部排名
    getTeamRank : 'SELECT tName, wNum,fNum,rate,states FROM teaminfor WHERE wNum != "" AND part="西部" ORDER BY rate DESC;SELECT tName, wNum,fNum,rate,states FROM teaminfor WHERE wNum != "" AND part="东部" ORDER BY rate DESC',
    // 一开始加载球员各项数据
    getPlayerData : 
    `
    SELECT player,tName,points,logoSrc FROM playerinfor WHERE points != ""  ORDER BY points DESC LIMIT 0,10;
    SELECT player,tName,reb,logoSrc FROM playerinfor WHERE points != ""  ORDER BY reb DESC LIMIT 0,10;
    SELECT player,tName,assist,logoSrc FROM playerinfor WHERE points != ""  ORDER BY assist DESC LIMIT 0,10;
    SELECT player,tName,steal,logoSrc FROM playerinfor WHERE points != ""  ORDER BY steal DESC LIMIT 0,10;
    SELECT player,tName,block,logoSrc FROM playerinfor WHERE points != ""  ORDER BY block DESC LIMIT 0,10
    `,
    // 球员各项数据翻页  参数1：单项名称  参数2：第几页
    getSingleDataPage : function(item1,page1){
        return `SELECT player,tName,${item1} FROM playerinfor WHERE ${item1} != ""  ORDER BY ${item1} DESC LIMIT ${page1},10`
    },
    //现役球员个人生涯情况
    getplayerCareer : function(player,team){
        return `
        SELECT number,height,weight,rookie FROM playerinfor WHERE player="${player}" AND tName="${team}" AND number IS NOT NULL;
        SELECT  preteam,season,cpoint,creb,cassist,csteal,cblock,avedata FROM playerinfor WHERE player="${player}" AND tName="${team}" AND preteam IS NOT NULL;
        SELECT honor FROM playerinfor WHERE player="${player}" AND tName="${team}" AND honor IS NOT NULL;
        `
    }

}