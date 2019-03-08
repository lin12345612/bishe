const mysql = require('mysql');
const dbConfig = require('./db.js');
const sqlMap = require('./sqlMap.js');

const pool = mysql.createPool({
    host:dbConfig.mysql.hostm,
    user : dbConfig.mysql.user,
    password :dbConfig.mysql.password,
    database : dbConfig.mysql.database,
    port : dbConfig.mysql.port,
    multipleStatements: true
})

module.exports = {
    getValue(req,res,next){
        
        pool.getConnection((err,connection) =>{
            var sql = sqlMap.getValue;
            var msg = '查询成功';
            var _res = {};
            connection.query(sql,(err,result) =>{
                _res.msg = msg;
                _res.info = result;
                res.json(_res);
                connection.release();
            })
        })
    },
    setValue(req,res,next){
        console.log(req.body);
        var tid = req.body.tid,tname = req.body.name,tage = req.body.tage;
        pool.getConnection((err,connection) =>{
            var sql = sqlMap.setValue;
            var msg  = '添加数据成功';
            var _res = {}
            connection.query(sql,[tid,tname,tage],(err,result) => {
                _res.msg = msg;
                console.log(result);
                console.log(err);
                if(err == null){
                    _res.info = result;
                    res.json(_res)
                }
                connection.release();
            })
        })
    }

}