const mysql = require('mysql');
const dbConfig = require('../databaseConfig/db');
const sqlMap = require('../sqlmap/mysql.js');
const sendMailer = require('../nodemailer/mailer.js');
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
            connection.query(sql,[_team,_team,_team,_team],(err,result) =>{
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
    // 获取前端输入的姓名
    getQyName(req,res,next){
        pool.getConnection((err,connection) => {
            if(err){
                return '连接出错';
            }
            var msg = '查询成功';
            var _res = {};
            var _name = req.query.name;
            var sql = sqlMap.searchName(_name);
            connection.query(sql,(err,result)=>{
                if(err){
                    console.log('数据传输出错');
                    return ;
                }
                _res.msg = msg;
                _res.info = result;
                res.json(_res);
                connection.release()
            })
        })
    },
    // 查询比赛
    getGame(req,res,next){
        pool.getConnection((err,connection) => {
            if(err){
              return '连接出错';
            }
            var msg = '查询成功';
            var _res = {};
            var _time = req.query.time;
            var sql = sqlMap.searchGame(_time);
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
    // 生成验证码
    createCode(req,res,next){
        // 生成六位随机数
        var num = '';
        for(var g = 0 ; g < 6 ; g++){
            num += Math.floor(Math.random()*10)
        }
        var _yh = req.query.user;
        var _flag = req.query.exist;
        
        // 发送邮件
        var mail1 = {
            from : 'nbachat@foxmail.com',//发件人
            subject : '验证码',
            to : _yh,
            text : `您好，验证码为：${num}，请勿泄露！`
        }
        sendMailer(mail1);
        pool.getConnection((err,connection) =>{
            if(err){
                return '连接出错';
            }
            var msg = '验证码发送成功';
            var _res = {};
            var jg = 200;
            // console.log(_flag);
            if(_flag == 'true'){    //判断是注册还是修改密码的请求，true为修改密码，则为update语句，false为注册，则为插入语句
                var sql = sqlMap.updateCode(_yh,num);
                
            }else if(_flag == 'false'){
                var sql = sqlMap.insertCode(_yh,num);
            }
            // console.log(sql);
            // console.log(_yh,num);
            connection.query(sql,(err,result) =>{
                if(err){
                    console.log('数据传输出错了');
                    return ;
                }
                _res.msg = msg;
                _res.jg = jg;
                res.json(_res);
                connection.release();
            })
        })
    },
    // 判断邮箱是否存在
    checkAccount(req,res,next){
        pool.getConnection((err,connection) =>{
            if(err){
                return '连接出错了';
            }
            var msg = '查询成功';
            var jg = null;
            var _res = {};
            var _yh = req.query.user;
            var sql = sqlMap.checkAccount;
            connection.query(sql,[_yh], (error,result)=> {
                if(error){
                    console.log('数据传输出错了');
                    return;
                }
                var _item = JSON.parse(JSON.stringify(result))
                // console.log(_item.length);
                if(_item.length > 0){
                    jg = true
                }else{
                    jg = false;
                }
                _res.msg = msg;
                _res.info = jg;
                res.json(_res)
                connection.release();
            })
        })
    },
    // 判断验证码
    checkCode(req,res,next){
        var _yh = req.query.user;  //账号
        var _psw = req.query.psw; //密码
        var _yzm  = req.query.code; //验证码
        new Promise((resolve,reject) =>{
            pool.getConnection((err,connection) =>{
                if(err){
                    return '连接出错了';
                }
                var _res = {};
                var sql = sqlMap.checkCode;
                connection.query(sql,[_yh], (error,result)=> {
                    if(error){
                        console.log('数据传输出错了');
                        return;
                    }
                    var _item = JSON.parse(JSON.stringify(result))[0].code;
                    if(_item == _yzm){    //相同则校验成功
                        _res.msg = '注册成功';
                        _res.regi = true;
                        res.json(_res)
                        connection.release();
                        resolve()
                    }else{
                        _res.msg = '验证码出错';
                        _res.regi = false;
                        res.json(_res)
                        connection.release();
                    }
                })
            })
        }).then(()=>{
            pool.getConnection((err,connection) =>{
                if(err){
                    return '连接出错了';
                }
                var sql = sqlMap.upDateUser;
                connection.query(sql,[_psw,_yh], (error,result)=> {
                    if(error){
                        console.log('数据传输出错了');
                        return;
                    }
                    connection.release()
                })
            })
        })
    },
    // 随机重置验证码
    resetCode(req,res,next){
        var _yh = req.query.user;
        var num = '';
        for(var g = 0 ; g < 6 ; g++){
            num += Math.floor(Math.random()*10)
        }
        pool.getConnection((err,connection) => {
            if(err){
                return '连接出错'
            }
            var msg = '重置成功';
            var _res = {}
            var sql = sqlMap.updateCode(_yh,num);
            connection.query(sql,(err,result)=>{
                if(err){
                    console.log('数据传输出错');
                    return;
                }
                _res.msg = msg;
                res.json(_res);
                connection.release()
            })
        })
    },
    // 重置密码
    resetPsw(req,res,next){
        var _yh = req.query.user;
        var _psw = req.query.psw;
        pool.getConnection((err,connection) =>{
            if(err){
                return '连接出错了';
            }
            var msg = '重置成功';
            var _res = {}
            var sql = sqlMap.upDateUser;
            connection.query(sql,[_psw,_yh], (error,result)=> {
                if(error){
                    console.log('数据传输出错了');
                    return;
                }
                _res.msg = msg;
                _res.cg = true
                res.json(_res)
                connection.release()
            })
        })
    }
}