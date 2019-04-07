const mysql = require('mysql');
const dbConfig = require('../databaseConfig/db');
const sqlMap = require('../sqlmap/mysql.js');
var path = require('path');

const pool = mysql.createPool({
    host : dbConfig.mysql.host,
    port:dbConfig.mysql.port,
    user :dbConfig.mysql.user,
    database : dbConfig.mysql.database,
    password:dbConfig.mysql.password,
    multipleStatements:true
})

module.exports = {
    // 获取球队排名
    getTeamRank(req,res,next){
        pool.getConnection((err,connection) =>{
            if(err){
                return '连接出错了，请处理'
            }
            var sql = sqlMap.getTeamRank;
            var msg = '查询成功';
            var _res = {}
            connection.query(sql,(err,result) =>{
                if(err){
                    return "数据请求出错，请检查sql语句或者语法";
                }
                _res.msg = msg;
                _res.info = result;
                res.json(_res);
                connection.release()
            })
        })
    },
    // 一开始加载各单项数据前十位
    getTopten(req,res,next){
        pool.getConnection((err,connection) =>{
            if(err){
                return '连接出错';
            }
            var sql = sqlMap.getPlayerData;
            var msg = '查询成功';
            var _res = {}
            connection.query(sql,(err,result) =>{
               if(err){
                   console.log('数据传输出错了');
                   return;
               }
               _res.msg = msg;
               _res.info=result;
               res.json(_res);
               connection.release();
            }) 
        })
    },
    // 各个单项获取数据
    getSingleData(req,res,next){
        pool.getConnection((err,connection) => {
            if(err){
                return '连接出错';
            }
            var msg = '查询成功'
            var _res = {};
            var _item = req.body.item;
            var _offset =req.body.offset;
            var sql = sqlMap.getSingleDataPage(_item,_offset);
            connection.query(sql,(err,result) =>{
               if(err){
                   console.log('数据传输出错了');
                   return;
               }
               _res.msg = msg;
               _res.info=result;
               res.json(_res);
               connection.release();
            }) 
        })
    },
    // 返回球员信息
    getPlayerInfor(req,res,next){
        pool.getConnection((err,connection) => {
            if(err){
              return '连接出错';
            }
            var msg = '查询成功';
            var _res = {};
            var _player = req.body.player;
            var _team = req.body.team;
            var sql = sqlMap.getplayerCareer(_player,_team)
            console.log(sql);
            connection.query(sql,(err,result) =>{
                if(err){
                   console.log('数据传输出错了');
                   return;
                }
               _res.msg = msg;
               _res.info=result;
               res.json(_res);
               connection.release();
            }) 
        })
    },
    // 返回球队logo
    getTeamLogo(req,res){
        // console.log(__filename);
        var mypath = path.parse(__dirname).dir;
        // var myPath = str.dir
        res.sendFile(mypath+'/public/img/logo/76ers.png')
    }
}