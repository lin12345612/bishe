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
            var _item = req.query.item;
            var _offset =req.query.offset;
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
            var _player = req.query.player;
            var _team = req.query.team;
            var sql = sqlMap.getplayerCareer(_player,_team)
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
    // 返回球队信息
    getTeamInfor(req,res,next){
        pool.getConnection((err,connection) => {
            if(err){
              return '连接出错';
            }
            var msg = '查询成功';
            var _res = {};
            var _team = req.query.team;
            var sql = sqlMap.getTeamInfor;
            connection.query(sql,[_team,_team,_team],(err,result) =>{
                if(err){
                   console.log('数据传输出错了');
                   return;
                }
               _res.msg = msg;
            //    var arr1 = result[2];
            //    var arr2 = [];
            //    var str = null;
            //    var _length = arr1.length;
            //    for (let g = 0; g < _length; g++) {
            //         str = JSON.stringify(arr1[g]);
            //         str = JSON.parse(str).player;
            //         arr2.push(str)
            //    }
            //    result[2] = arr2;
               _res.info=result;
               res.json(_res);
               connection.release();
            }) 
        })
    }
}