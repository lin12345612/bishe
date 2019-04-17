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


module.exports = router;
