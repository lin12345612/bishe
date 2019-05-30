var express = require('express');
var router = express.Router();
var api = require('../api/api')
/* GET home page. */
router.get('/pc/', function(req, res, next) {
  res.render('index');
});



// api
// 首页请求球队排名
router.get('/api/getTeamRank',(req,res,next) =>{
    api.getTeamRank(req,res,next)
})
// 一开始加载各单项数据前十位
router.get('/api/getTopten',(req,res,next) =>{
  api.getTopten(req,res,next)
}) 
// 各个单项的更多数据
router.post('/api/getSingleData',(req,res,next) =>{
  api.getSingleData(req,res,next)
})

// 获取现役球员相关信息
router.post('/api/getPlayerInfor',(req,res,next)=>{
  api.getPlayerInfor(req,res,next);
})

// 获取球队信息
router.post('/api/getTeamInfor',(req,res,next) =>{
  api.getTeamInfor(req,res,next)
})

// 模糊查询球员姓名
router.post('/api/searchName',(req,res,next)=>{
  api.getQyName(req,res,next)
})

//查询比赛
router.post('/api/searchGame',(req,res,next)=>{
  api.getGame(req,res,next)
})

// 生成验证码
router.post('/api/createCode',(req,res,next) =>{
  api.createCode(req,res,next);
})
// 检查账户是否存在
router.post('/api/checkAccount',(req,res,next)=>{
  api.checkAccount(req,res,next);
})

// 检查验证码是否正确以及存入数据库
router.post('/api/checkCodeAndRegi',(req,res,next) =>{
  api.checkCode(req,res,next)
})

// 重置验证码
router.post('/api/resetCode',(req,res,next) =>{
  api.resetCode(req,res,next)
})
// 重置密码
router.post('/api/resetPsw',(req,res,next) =>{
  api.resetPsw(req,res,next);
})

module.exports = router;
