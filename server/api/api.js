const mysql = require('mysql');
const dbConfig = require('../databaseConfig/db');
const sqlMap = require('../sqlmap/mysql.js');
const sendMailer = require('../nodemailer/mailer.js');
var fs = require('fs');
const path = require('path')
const JWT = require('../utils/token.js');
const utils = require('../utils/handlepsw.js');

const pool = mysql.createPool({
    host : dbConfig.mysql.host,
    port:dbConfig.mysql.port,
    user :dbConfig.mysql.user,
    database : dbConfig.mysql.database,
    password:dbConfig.mysql.password,
    multipleStatements:true
})

module.exports = {
    // 记录ip
    recordVisitor(req,res,next){
        console.log(utils.handleIp(req.ip));
    },
    // 获取球队排名
    getTeamRank(req,res,next){
        pool.getConnection((err,connection) =>{
            if(err){
                res.send(err);
                return '连接出错了，请处理'
            }
            var sql = sqlMap.getTeamRank;
            var msg = '查询成功';
            var _res = {}
            connection.query(sql,(err,result) =>{
                if(err){
                    res.send(err)
                    connection.release()
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
                res.send(err)
                return '连接出错';
            }
            var sql = sqlMap.getPlayerData;
            var msg = '查询成功';
            var _res = {}
            connection.query(sql,(err,result) =>{
               if(err){
                    res.send(err)
                    connection.release()
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
                res.send(err)
                return '连接出错';
            }
            var msg = '查询成功'
            var _res = {};
            var _item = req.body.item;
            var _offset =req.body.offset;
            var sql = sqlMap.getSingleDataPage(_item,_offset);
            connection.query(sql,(err,result) =>{
               if(err){
                   res.send(err);
                   connection.release();
                   return;
               }
               let _result = JSON.parse(JSON.stringify(result));
               let arr = []
               for(let i = 0; i<_result.length;i++){
                   arr.push({
                       pid: _result[i].pid,
                       player : _result[i].player,
                       tid : _result[i].tid,
                       sj : _result[i][_item]
                   })
               }
               _res.msg = msg;
               _res.info=arr;
               res.json(_res);
               connection.release();
            }) 
        })
    },
    // 返回球员信息
    getPlayerInfor(req,res,next){
        pool.getConnection((err,connection) => {
            if(err){
                res.send(err)
              return '连接出错';
            }
            var msg = '查询成功';
            var _res = {};
            var pid = req.body.pid;
            var sql = sqlMap.getplayerCareer(pid)
            connection.query(sql,(err,result) =>{
                if(err){
                    res.send(err);
                    connection.release();
                    return;
                }
               _res.msg = msg;
               _res.info = result;
               res.send(_res);
               connection.release();
            }) 
        })
    },
    // 返回球队信息
    getTeamInfor(req,res,next){
        pool.getConnection((err,connection) => {
            if(err){
                res.send(err);
                return '连接出错';
            }
            var msg = '查询成功';
            var _res = {};
            var _team = req.query.team || req.body.team;
            var sql = sqlMap.getTeamInfor;
            connection.query(sql,[_team,_team,_team],(err,result) =>{
                if(err){
                    res.send(err);
                    connection.release();
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
                res.send(err);
                return '连接出错';
            }
            var msg = '查询成功';
            var _res = {};
            var _name = req.query.name || req.body.name;
            var sql = sqlMap.searchName(_name);
            connection.query(sql,(err,result)=>{
                if(err){
                    res.send(err);
                    connection.release();
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
                res.send(err);
                return '连接出错';
            }
            var msg = '查询成功';
            var _res = {};
            var _time = req.query.time;
            var sql = sqlMap.searchGame(_time);
            connection.query(sql,(err,result) =>{
                if(err){
                    res.send(err);
                    connection.release();
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
        var _yh = req.query.user || req.body.user;
        var _flag = req.query.exist || req.body.exist;
        
        // 发送邮件
        var mail1 = {
            from : 'nbachat@foxmail.com',//发件人
            subject : '验证码',
            to : _yh,
            text : `您好，验证码为：${num}，一分钟内有效，请勿泄露！`
        }
        sendMailer(mail1);
        pool.getConnection((err,connection) =>{
            if(err){
                res.send(err);
                return '连接出错';
            }
            var msg = '验证码发送成功';
            var _res = {};
            var jg = 200;
            if(_flag == 'true'){    //判断是注册还是修改密码的请求，true为修改密码，则为update语句，false为注册，则为插入语句
                var sql = sqlMap.updateCode(_yh,num);
                
            }else if(_flag == 'false'){
                var sql = sqlMap.insertCode(_yh,num);
            }
            connection.query(sql,(err,result) =>{
                if(err){
                    res.send(err);
                    connection.release();
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
                res.send(err);
                return '连接出错了';
            }
            var msg = '查询成功';
            var jg = null;
            var _res = {};
            var _yh = req.query.user || req.body.user;
            var sql = sqlMap.checkAccount;
            connection.query(sql,[_yh], (error,result)=> {
                if(error){
                    res.send(err);
                    connection.release();
                    return;
                }
                var _item = JSON.parse(JSON.stringify(result))
                // console.log(_item.length);
                if(_item.length > 0){
                    if(_item[0].psw){
                        jg = true
                    }else{
                        jg = false;
                    }
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
    // 判断验证码注册
    checkCode(req,res,next){
        var _yh = req.query.user || req.body.user;  //账号
        var _psw = req.query.psw || req.body.psw; //密码
        var _yzm  = req.query.code || req.body.code; //验证码
        pool.getConnection((err,connection)=>{
          if(err){
              res.send(err)
              return '数据库连接失败'
          }
          let _res = {}
          let sql = sqlMap.checkCode;
          connection.query(sql,[_yh],(err,result)=>{
               if(err){
                  res.send(err)
                  connection.release()
                  return '数据传输错误'
               }
               let _item = JSON.parse(JSON.stringify(result));
               if(_item.length >0){
                    if(_item[0].code == _yzm){
                        _res.mg = '注册成功';
                        _res.regi = true;
                        this.resetCode(_yh);  //重置验证码
                        this.insertPsw(_yh,_psw);
                    }else{
                        _res.msg="验证码错误";
                        _res.regi = false;
                    }
               }else{
                   _res.regi = false;
                   _res.wrongUser = true;
               }
               res.send(_res)
               connection.release()
          })
        })

    },
    // 随机重置验证码
    resetCode(_yh){
        var num = '';
        for(var g = 0 ; g < 6 ; g++){
            num += Math.floor(Math.random()*10)
        }
        pool.getConnection((err,connection) => {
            if(err){
                return '连接出错'
            }
            var sql = sqlMap.updateCode(_yh,num);
            connection.query(sql,(err,result)=>{
                if(err){
                    connection.release();
                    return;
                }
                connection.release()
            })
        })
    },
    // 写入密码
    insertPsw(_yh,psw){
        let str = Math.random().toString(32).substr(2); // 密码加盐
        let newp = utils.pswEnCode(psw,str);
        pool.getConnection((err,connection)=>{
          if(err){
              console.log('密码写入错误');
              console.log(err);
              return '数据库连接失败'
          }
          let sql = sqlMap.upDateUser;
          connection.query(sql,[newp,str,_yh],(err,result)=>{
               if(err){
                   console.log('密码写入错误');
                   console.log(err);
                  connection.release()
                  return '数据传输错误'
               }
               connection.release()
          })
        })
    },
    
    // pc端重置密码
    // 重置密码校验验证码
    resetPswCheckCode(req,res,next){
        let _user = req.body.user ;
        let _code  = req.body.code;
        let _res = {}
        pool.getConnection((err,connection)=>{
            if(err){
                res.send(err)
                return '数据库连接失败'
            }
            let sql = sqlMap.checkCode;
            connection.query(sql,[_user],(err,result)=>{
                if(err){
                    res.send(err)
                    connection.release()
                    return '数据传输错误'
                }
                let _result = JSON.parse(JSON.stringify(result));
                if(_result[0].code == _code){
                    _res.success = true;
                    this.resetCode(_user)
                }else{
                    _res.success = false;
                }
                res.json(_res)
                connection.release()
            })
        })
    },
    // 重置密码
    resetPsw(req,res,next){
        var _yh = req.query.user;
        var _psw = req.query.psw;
        let str = Math.random().toString(32).substr(2); // 密码加盐
        let newp = utils.pswEnCode(_psw,str);
        pool.getConnection((err,connection) =>{
            if(err){
                res.send(err);
                return '连接出错了';
            }
            var msg = '重置成功';
            var _res = {}
            var sql = sqlMap.upDateUser;
            connection.query(sql,[newp,str,_yh], (error,result)=> {
                if(error){
                    res.send(error);
                    connection.release();
                    return;
                }
                _res.msg = msg;
                _res.success = true;
                res.json(_res)
                connection.release()
            })
        })
    },

    // 移动端重置密码
    moblieresetpsw(req,res,next){
        pool.getConnection((err,connection) =>{
            if(err){
                res.send(err);
                return '连接出错了，请处理'
            }
            let _user = req.body.user;
            let _psw = req.body.psw;
            let _code = req.body.code;
            var sql = sqlMap.checkCode;
            var _res = {}
            connection.query(sql,[_user],(err,result) =>{
                if(err){
                    res.send(err)
                    connection.release()
                    return '数据请求出错，请检查sql语句或者语法';
                }
                let _result = JSON.parse(JSON.stringify(result))
                if(_result[0].code == _code){
                    let str = Math.random().toString(32).substr(2); // 密码加盐
                    let newp = utils.pswEnCode(_psw,str);
                    let sql1 = sqlMap.upDateUser;
                    connection.query(sql1,[newp,str,_user],(err,data)=>{
                        if(err){
                            res.send(err)
                            connection.release()
                            return '数据请求出错，请检查sql语句或者语法';
                        }
                        this.resetCode(_user)
                        _res.success = true;
                        res.send(_res);
                        connection.release();
                    })
                }else{
                    _res.success= false;
                    res.send(_res);
                    connection.release()
                }
            })
        })
    },
    // 用户登录
    userLogin(req,res,next){
        var _yh = req.body.user;
        var _psw = req.body.psw;
        pool.getConnection((err,connection) =>{
            if(err){
                res.send(err)
                return '连接出错'
            }
            var _res = {}
            var sql = sqlMap.login;
            connection.query(sql,[_yh],(err,result) =>{
                if(err){
                    res.send(err);
                    connection.release();
                    return '数据传输出错'
                }
                var _item = JSON.parse(JSON.stringify(result))
                if(_item.length > 0){   //账号存在
                    _res.exist = true;
                    var _tpsw = _item[0].psw;
                    let _mmstr = _item[0].mmstr;
                    let cdmm = utils.pswEnCode(_psw,_mmstr);
                    if(_tpsw == cdmm ){    //密码验证成功，登录成功
                        // 生成token
                        var jwt = new JWT(_yh);
                        let token = jwt.createToken();
                        // 已选择完球队
                        if(_item[0].selected == 'done'){
                            _res.selected = true
                            let _qx = _item[0].xhqx? _item[0].xhqx.split(',') : [];
                            let _qd = _item[0].xhqd?_item[0].xhqd.split(','):[];
                            let sql1 = '';
                            let len = _qx.length;
                            for(let i = 0; i<_qx.length;i++){
                                sql1 += sqlMap.favoPlayerInfor(_qx[i])
                            }
                            for(let i = 0 ; i < _qd.length;i++){
                                sql1 += sqlMap.favoTeamInfor(_qd[i])
                            }
                            connection.query(sql1,(err,data)=>{
                                if(err){
                                    res.send(err);
                                    connection.release();
                                    return err;
                                }
                                let _data = JSON.parse(JSON.stringify(data));
                                let _xhqx = [];
                                let _xhqd = [];
                                for(let i = 0 ; i < len;i++){
                                    _xhqx.push(_data[i][0])
                                }
                                if(len != _data.length){
                                    for(let i = len ; i < _data.length;i++){
                                        _xhqd.push(_data[i][0])
                                    }
                                }
                                _res.xhqd = _xhqd;
                                _res.xhqx = _xhqx;
                                _res.token = token;
                                _res.msg = "登录成功";
                                _res.txSrc = _item[0].txSrc;
                                res.json(_res);
                                connection.release()
                            })
                        }
                        // 未选择球队
                        else{
                            _res.selected = false
                            _res.token = token;
                            _res.msg = "登录成功";
                            _res.txSrc = _item[0].txSrc;
                            res.json(_res);
                            connection.release()
                        }
                    }else{
                        _res.msg = '密码不正确';
                        _res.info = [];
                        res.json(_res);
                        connection.release()
                    }
                }else{                  //账号不存在
                    _res.msg = "账号不存在"
                    _res.exist = false;
                    res.json(_res);
                    connection.release()
                }
            })
        })
    },

    // 更新用户的喜爱球队和球星以及返回对应的数据
    Updatept(req,res,next){
        var _qd = req.query.qd;
        var _qx = req.query.qx;
        var _user = req.query.user;
        pool.getConnection((err,connection) =>{
            if(err){
                res.send(err)
                return '连接出错';
            }
            var _res = {}
            var sql = '';
            var sql1 = sqlMap.selectedDone(_qx,_qd,_user);
            sql += sql1;
            // 处理球星和所在球队
            let qxArr = _qx.split(',');
            let qdArr = _qd.split(',');
            let len = qxArr.length;
            let len1 = qdArr.length;
            for(let i = 0; i < len; i++){
                var str1 = '';
                str1 = sqlMap.favoPlayerInfor(qxArr[i])
                sql += str1;
            }

            for(var g = 0 ; g < len1 ; g++){
                var str2 = sqlMap.favoTeamInfor(qdArr[g])  
                sql += str2;
            }
            connection.query(sql,(err,result)=>{
                if(err){
                    res.send(err)
                    connection.release()
                    return '数据传输出错';
                }
                let _item = JSON.parse(JSON.stringify(result));
                _item.shift();
                var jg = [];
                for(let j = 0; j<_item.length;j++){
                    jg.push(_item[j][0])
                }
                _res.msg = '成功';
                _res.qylength = len;
                _res.result = jg;
                res.json(_res)
                connection.release()
            })
        })
    },
    // 存储图片的路径
    storeImg(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){
                res.send(err)
                return '数据库连接出错'
            }
            let _name = req.file.originalname;
            let _index = _name.lastIndexOf('.')+1;
            let _hz = _name.substring(_index)
            var _user = req.body.user;
            var _path = `/user/${_user}.${_hz}`;
            var _res = {}
            fs.writeFileSync(path.join(__dirname + `/../public${_path}`),Buffer.from(req.file.buffer))
            var sql = sqlMap.getUpdateSrc(_path,_user);
            connection.query(sql,(err,result) =>{
                if(err){
                    res.send(err)
                    connection.release()
                    return '数据查询出错'
                }
                _res.msg="更新成功";
                _res.success = true;
                res.json(_res)
                connection.release()
            })

        })
    },
    // 每次加载
    getSingleDataByParams(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){
                res.send(err)
                return '数据库连接出错'
            }
            var _itemArr = req.body.itemArr;
            var _num = req.body.number;
            var _start = req.body.start;
            var _res = {}
            var sql = '';
            for (const value of _itemArr) {
                sql =sql +sqlMap.getSingleDataByParams(value,_start,_num)+';'
            }
            connection.query(sql,(err,result) =>{
                if(err){
                    res.send(err)
                    connection.release()
                    return '数据查询出错'
                }
                _res.result = result;
                _res.msg="查询成功";
                _res.success = true;
                res.json(_res)
                connection.release()
            })

        })
    },
    // 移动端查询比赛
    getScheme(req,res,next){
        pool.getConnection((err,connection) =>{
            if(err){
                res.send(err)
                return '数据库连接出错'
            }
            let _page = req.query.page;
            let _sql = sqlMap.getScheme(_page);
            connection.query(_sql,(err,result)=>{
                if(err){
                    res.send(err)
                    connection.release()
                    return '数据传输出错'
                }
                let _res = {}
                _res.msg = '查询成功'
                _res.result = result
                _res.success = true;
                res.json(_res)
                connection.release()
            })
            
        })
    },
    // 获取新闻
    getTeamNews(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){
                res.send(err)
                return '数据库连接失败'
            }
            let _team = req.body.team;
            let _page = req.body.page;
            let sql = sqlMap.getTeamNews(_team,_page);
            connection.query(sql,(err,result)=>{
                if(err){
                    res.send(err)
                    connection.release()
                    return '数据传输错误'
                }
                let _res = {}
                _res.msg = '查询成功'
                _res.result = result;
                _res.success = true;
                res.json(_res)
                connection.release()
            })
        })
    },
    // 获取热门球星
    getHotPlayer(req,res,next){
        pool.getConnection((err,connection)=>{
          if(err){
                res.send(err)
              return '数据库连接失败'
          }
          let _res = {}
          let sql = sqlMap.getHotPlayer;
          connection.query(sql,(err,result)=>{
               if(err){
                    res.send(err)
                    connection.release()
                  return '数据传输错误'
               }
               _res.result = result;
               res.json(_res)
               connection.release()
          })
        })
    },
    // 根据球队获取球员
    getPlayerByTeam(req,res,next){
        pool.getConnection((err,connection)=>{
          if(err){
              res.send(err)
              return '数据库连接失败'
          }
          let _team = req.body.team;
          let _res = {}
          let sql = sqlMap.getPlayerByTeam(_team);
          connection.query(sql,(err,result)=>{
               if(err){
                   res.send(err);
                   connection.release()
                  return '数据传输错误'
               }
               _res.msg="查询成功"
               _res.result = result;
               res.json(_res)
               connection.release()
          })
        })
    },
    // 移动端登录
    mobileLogin(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){
                res.send(err)
                return '数据库连接失败'
            }
            let _user = req.body.user;
            let _psw = req.body.psw;
            let _res = {}
            let sql = sqlMap.login;
            connection.query(sql,[_user],(err,result)=>{
                if(err){
                    res.send(err)
                    connection.release()
                    return '数据传输错误'
                }
                let _result =JSON.parse(JSON.stringify(result))
                if(_result.length > 0){
                    let _newp = utils.pswEnCode(_psw,_result[0].mmstr);
                    if(_newp == _result[0].psw){
                        _res.success = true;
                        _res.info={
                            user :_user,
                            txSrc : _result[0].txSrc,
                            nn : _result[0].nickname,
                            qx : _result[0].xhqx,
                            qd : _result[0].xhqd
                        }
                    }else{
                        _res.success = false
                    }
                }else{
                    _res.nouser = true;
                    _res.success = false
                }
                res.json(_res)
                connection.release()
            })
        })
    },
    // 修改昵称
    modifyNc(req,res,netx){
        pool.getConnection((err,connection)=>{
          if(err){
              res.send(err)
              return '数据库连接失败'
          }
          let _res = {}
          let sql = sqlMap.modifyNc;
          let _user = req.body.user;
          let _nc = req.body.nc;
          connection.query(sql,[_nc,_user],(err,result)=>{
               if(err){
                  res.send(err)
                  connection.release()
                  return '数据传输错误'
               }
               _res.success = true;
               res.json(_res)
               connection.release()
          })
        })
    },
    // 修改密码
    modifyPsw(req,res,next){
        pool.getConnection((err,connection)=>{
          if(err){
              res.send(err)
              return '数据库连接失败'
          }
          let _res = {}
          let sql = sqlMap.login;
          let _user = req.body.user;
          let _op = req.body.oldpsw;
          let _np = req.body.newpsw
          connection.query(sql,[_user],(err,result)=>{
               if(err){
                  res.send(err)
                  connection.release()
                  return '数据传输错误'
               }
               let _result = JSON.parse(JSON.stringify(result))
               let _op1 = utils.pswEnCode(_op,_result[0].mmstr);
               if(_op1 == _result[0].psw){
                    let str = Math.random().toString(32).substr(2); // 密码加盐
                    let _np1 = utils.pswEnCode(_np,str);
                    let sql1 = sqlMap.upDateUser;
                    connection.query(sql1,[_np1,str,_user],(err,data)=>{
                        if(err){
                            res.send(err)
                            connection.release();
                            return;
                        }
                        _res.success = true;
                        res.json(_res)
                        connection.release()
                    })
               }else{
                   _res.success = false;
                   res.json(_res)
                   connection.release()
               }
          })
        })
    },
    // 保存反馈意见
    recordMessage(req,res,next){
        pool.getConnection((err,connection)=>{
          if(err){
              res.send(err)
              return '数据库连接失败'
          }
          let _res = {}
          let _opin = req.body.opinion;
          let sql = sqlMap.recordMessage;
          connection.query(sql,[_opin],(err,result)=>{
               if(err){
                  res.send(err)
                  connection.release()
                  return '数据传输错误'
               }
               _res.success = true;
               res.json(_res)
               connection.release()
          })
        })
    },
    // 获取喜欢球员信息
    getLikePlayerInfor(req,res,next){
        pool.getConnection((err,connection)=>{
          if(err){
              res.send(err)
              return '数据库连接失败'
          }
          let _res = {}
          let _qy = req.body.xhqx;
          let _arr = _qy.split(',');
          let str  = '(';
          for(let i = 0; i < _arr.length ; i++){
            if(i != _arr.length-1){
                str += `'${_arr[i]}',`
            }else{
                str += `'${_arr[i]}')`
            }
          }
          let sql = sqlMap.getPlayerInfor(str);
          connection.query(sql,(err,result)=>{
               if(err){
                  res.send(err)
                  connection.release()
                  return '数据传输错误'
               }
               _res.result = result;
               res.json(_res)
               connection.release()
          })
        })
    },
    // 更新喜欢球星以及返回喜欢球星
    updateAndGetPlayer(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){
                res.send(err)
                return '数据库连接失败'
            }
            let _res = {}
            let _arr = req.body.playArr;
            let _user = req.body.user;
            let sql = '';
            if(_arr.length > 0){
                let str = ''
                for(let i = 0 ; i < _arr.length;i++){
                    if(i != _arr.length-1){
                        str += `${_arr[i]},`
                    }else{
                        str += `${_arr[i]}`
                    }
                }
                sql += sqlMap.updateLikePlayer(str,_user);
                sql += sqlMap.getPlayerInfor(`(${str})`);
            }else{
                sql += sqlMap.updateLikePlayer('',_user)
            }
            connection.query(sql,(err,result)=>{
                if(err){
                    res.send(err)
                    connection.release()
                    return '数据传输错误'
                }
                let _result = JSON.parse(JSON.stringify(result));
                _res.success = true;
                if(_arr.length == 0){
                    _res.result = []
                }else{
                    _res.result = _result[1]
                }
                res.json(_res)
                connection.release()
            })
        })
    },
    // 更新喜欢的球队
    updateMyteam(req,res,next){
        pool.getConnection((err,connection)=>{
          if(err){
              res.send(err)
              return '数据库连接失败'
          }
          let _arr = req.body.likeArr ;
          let _user = req.body.user;
          let _xhqd = null;
          let _res = {}
          if(_arr.length > 0){
            _xhqd = ''
            for(let i = 0 ; i < _arr.length;i++){
                if(i != _arr.length-1){
                    _xhqd += `${_arr[i]},`
                }else{
                    _xhqd += `${_arr[i]}`
                }
            }
          }else{
            _xhqd = ''
          }
          let sql = sqlMap.updateMyTeam(_xhqd,_user)
          connection.query(sql,(err,result)=>{
               if(err){
                  res.send(err)
                  connection.release()
                  return '数据传输错误'
               }
               _res.success = true;
               res.json(_res)
               connection.release()
          })
        })
    },

    // 后台部分
    // 后台登录
    sysLogin(req,res,next){
        pool.getConnection((err,connection)=>{
            if(err){
                res.send(err)
                return '数据库连接失败'
            }
            let _res = {}
            let _user = req.body.user;
            if(_user != 'woshialinshuo'){
                _res.success = false;
                res.send(_res);
                connection.release()
            }else{
                let sql = sqlMap.login;
                connection.query(sql,[_user],(err,result)=>{
                    if(err){
                        res.send(err)
                        connection.release()
                        return '数据传输错误'
                    }
                    let _result = JSON.parse(JSON.stringify(result));
                    let _ipsw = req.body.psw;
                    let _str = _result[0].mmstr;
                    let _psw = utils.pswEnCode(_ipsw,_str);
                    if(_psw == _result[0].psw){
                        _res.success = true;
                    }else{
                        _res.success = false;
                    }
                    res.json(_res)
                    connection.release()
                })
            }
            
        })
    },
    // 根据搜索球员
    sysSearchPlayerByName(req,res,next){
        pool.getConnection((err,connection) =>{
            if(err){
                return '连接出错了，请处理'
            }
            let _name = req.body.player;
            var sql = sqlMap.sysSearchPlayerByName(_name)
            var _res = {}
            connection.query(sql,(err,result) =>{
                if(err){
                    res.send(err)
                    connection.release()
                    return '数据请求出错，请检查sql语句或者语法';
                }
                let _result = JSON.parse(JSON.stringify(result))
                if(_result.length > 0){
                    _result.map(val=>{
                        val.imgUrl = val.imgSrc
                        val.imgfile = ''
                        if(!val.tid){
                            val.tid=''
                        }
                        return val
                    })
                    _res.result = _result;
                }else{
                    _res.result = []
                }
                res.send(_res);
                connection.release()
            })
        })
    },
    // 根据球队筛选球员
    sysSearchPlayerByTeam(req,res,next){
        pool.getConnection((err,connection) =>{
            if(err){
                return '连接出错了，请处理'
            }
            let _tid = req.body.tid
            var sql = sqlMap.sysSearchPlayerByTeam(_tid)
            var _res = {}
            connection.query(sql,(err,result) =>{
                if(err){
                    res.send(err)
                    connection.release()
                    return '数据请求出错，请检查sql语句或者语法';
                }
                let _result = JSON.parse(JSON.stringify(result))
                if(_result.length > 0){
                    _result.map(val=>{
                        val.imgUrl = val.imgSrc
                        val.imgfile = ''
                        return val
                    })
                    _res.result = _result;
                }else{
                    _res.result = []
                }
                res.send(_res);
                connection.release()
            })
        })
    },
    // 新增以及修改球员
    sysOperaPlayer(req,res,next){
        pool.getConnection((err,connection) =>{
            if(err){
                return '连接出错了，请处理'
            }
            let _pid = req.body.pid;
            let _player = req.body.player;
            let _qyzt = req.body.qyzt;
            let _tid = req.body.tid;
            let _number = req.body.number;
            let _height = req.body.height;
            let _weight = req.body.weight;
            let _rookie = req.body.rookie;
            let _contract = req.body.contract;
            let _imgSrc = req.body.imgSrc;
            var sql = null; 
            if(_pid){              //修改信息
                sql = '';
                sql += sqlMap.sysModifyPlayer(_pid,_player,_qyzt,_tid,_number,_height,_weight,_rookie,_contract,_imgSrc) + sqlMap.sysGetPlayerId(_player,_tid)
            }else{                //新增
                sql = '';
                sql += sqlMap.sysAddPlayer(_player,_qyzt,_tid,_number,_height,_weight,_rookie,_contract,_imgSrc) + sqlMap.sysGetPlayerId(_player,_tid);
            }
            var _res = {}
            connection.query(sql,(err,result) =>{
                if(err){
                    res.send(err)
                    connection.release()
                    return '数据请求出错，请检查sql语句或者语法';
                }
                let _result = JSON.parse(JSON.stringify(result));
                console.log(_result);
                _res.pid = _result[1][0].pid;
                _res.success = true;
                res.send(_res);
                connection.release()
            })
        })
    },
    // 上传球员头像
    sysUploadPlayerTx(req,res,next){
        let _path = req.body.path;
        let _res = {}
        fs.writeFile(path.join(__dirname,`../public${_path}`),Buffer.from(req.file.buffer),(err,data)=>{
            if(err){
                _res.msg = err;
                _res.success = false;
                res.send(_res)
            }
            _res.success = true;
            res.send(_res)
        });
    },
    // 获取球员荣誉
    sysGetPlayerHonor(req,res,next){
        pool.getConnection((err,connection) =>{
            if(err){
                return '连接出错了，请处理'
            }
            let _pid = req.query.pid
            var sql = sqlMap.sysGetPlayerHonor(_pid) 
            var _res = {}
            connection.query(sql,(err,result) =>{
                if(err){
                    res.send(err)
                    connection.release()
                    return '数据请求出错，请检查sql语句或者语法';
                }
                _res.result = result;
                res.send(_res);
                connection.release()
            })
        })
    },
    // 新增球员荣誉
    sysAddPlayerHonor(req,res,next){
        pool.getConnection((err,connection) =>{
            if(err){
                return '连接出错了，请处理'
            }
            let honArr = req.body.honorArr;
            let pid = req.body.pid;
            let str = '';
            for(var i = 0 ; i < honArr.length ; i++){
                if(i != honArr.length -1){
                    str += `(${pid},'${honArr[i]}'),`
                }else{
                    str += `(${pid},'${honArr[i]}');`
                }
            }
            var sql = sqlMap.sysAddPlayerHonor(str);
            var _res = {}
            connection.query(sql,(err,result) =>{
                if(err){
                    res.send(err)
                    connection.release()
                    return '数据请求出错，请检查sql语句或者语法';
                }
                _res.success = true;
                res.send(_res);
                connection.release()
            })
        })
    },
    // 删除球员荣誉
    sysDeletePlayerHonor(req,res,next){
        pool.getConnection((err,connection) =>{
            if(err){
                return '连接出错了，请处理'
            }
            let _rid = req.body.rid;
            var sql = sqlMap.sysDeletePlayerHonor(_rid)
            var _res = {}
            connection.query(sql,(err,result) =>{
                if(err){
                    res.send(err)
                    connection.release()
                    return '数据请求出错，请检查sql语句或者语法';
                }
                _res.success = true;
                res.send(_res);
                connection.release()
            })
        })
    },
    // 查询球员生涯
    sysGetPlayerCareer(req,res,next){
        pool.getConnection((err,connection) =>{
            if(err){
                return '连接出错了，请处理'
            }
            let pid = req.query.pid;
            var sql = sqlMap.sysGetPlayerCareer(pid)
            var _res = {}
            connection.query(sql,(err,result) =>{
                if(err){
                    res.send(err)
                    connection.release()
                    return '数据请求出错，请检查sql语句或者语法';
                }
                _res.result = result;
                res.send(_res);
                connection.release()
            })
        })
    },
    // 前台输入sql语句
    sysGetSql(req,res,next){
        pool.getConnection((err,connection) =>{
            if(err){
                return '连接出错了，请处理'
            }
            var sql = req.body.sqlStr; 
            var _res = {}
            connection.query(sql,(err,result) =>{
                if(err){
                    res.send(err)
                    connection.release()
                    return '数据请求出错，请检查sql语句或者语法';
                }
                _res.success = true;
                res.send(_res);
                connection.release()
            })
        })
    },
    // 删除球员生涯数据
    sysDelPlayerCareer(req,res,next){
        pool.getConnection((err,connection) =>{
            if(err){
                return '连接出错了，请处理'
            }
            let sid = req.body.sid;
            var sql = sqlMap.sysDelPlayerCareer(sid)
            var _res = {}
            connection.query(sql,(err,result) =>{
                if(err){
                    res.send(err)
                    connection.release()
                    return '数据请求出错，请检查sql语句或者语法';
                }
                _res.success = true;
                res.send(_res);
                connection.release()
            })
        })
    },
    // 保存以及新增球队信息
    sysOperaTeam(req,res,next){
        pool.getConnection((err,connection) =>{
            if(err){
                return '连接出错了，请处理'
            }
            let sid = req.body.sid;
            let part = req.body.part;
            let tid = req.body.tid;
            let fName = req.body.fName;
            let tName = req.body.tName;
            let wNum  = req.body.wNum;
            let fNum = req.body.fNum;
            let rate = req.body.rate;
            let ranks = req.body.ranks;
            let states = req.body.states;
            let logoSrc = req.body.logoSrc;
            let tDes = req.body.tDes;
            let coach = req.body.coach;
            let groupName = req.body.groupName;
            var sql = null;
            if(sid){
                sql = sqlMap.sysModifyTeam(part,fName,tName,wNum,fNum,rate,ranks,states,logoSrc,tDes,coach,groupName,tid);
            }else{
                sql = sqlMap.sysAddTeam(part,fName,tName,wNum,fNum,rate,ranks,states,logoSrc,tDes,coach,groupName,tid)
            }
            var _res = {}
            connection.query(sql,(err,result) =>{
                if(err){
                    res.send(err)
                    connection.release()
                    return '数据请求出错，请检查sql语句或者语法';
                }
                _res.success = true;
                res.send(_res);
                connection.release()
            })
        })
    },
    // 删除新闻
    sysDelNews(req,res,next){
        pool.getConnection((err,connection) =>{
            if(err){
                return '连接出错了，请处理'
            }
            let keyid = req.body.keyid;
            var sql = sqlMap.sysDelNews(keyid);
            var _res = {}
            connection.query(sql,(err,result) =>{
                if(err){
                    res.send(err)
                    connection.release()
                    return '数据请求出错，请检查sql语句或者语法';
                }
                _res.success = true;
                res.send(_res);
                connection.release()
            })
        })
    }
}