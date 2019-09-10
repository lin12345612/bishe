var express = require('express');
var router = express.Router();
var api = require('../api/api')

const multer = require('multer');
var storage = multer.memoryStorage()


const upload = multer({storage:storage});

/* GET home page. */
router.get('/pc/', function(req, res, next) {
  api.recordVisitor(req,0)
  res.render('index1');
});
router.get('/pc/*', function(req, res, next) {
  res.redirect('/pc/')
});

router.get('/mobile/', function(req, res, next) {
  api.recordVisitor(req,1)
  res.render('index2');
});
router.get('/mobile/*', function(req, res, next) {
  res.redirect('/mobile/')
});


// api
// 功能点击
router.post('/api/recordClick',(req,res,next)=>{
  api.recordClick(req,res,next)
})


// 首页请求球队排名
router.get('/api/getTeamRank',(req,res,next) =>{
    api.getTeamRank(req,res,next)
})
// 一开始加载各单项数据前十位
router.get('/api/getTopten',(req,res,next) =>{
  api.getTopten(req,res,next)
}) 
// 各单项数据每次加载N条
router.post('/api/getDataByparams',(req,res,next)=>{
  api.getSingleDataByParams(req,res,next)
})
// 各个单项每次加载10个数据数据
router.post('/api/getSingleData',(req,res,next) =>{
  api.getSingleData(req,res,next)
})

// 获取球员相关信息
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

// 移动端查询比赛
router.post('/api/getScheme',(req,res,next)=>{
  api.getScheme(req,res,next)
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
// PC端重置密码校验验证码
router.post('/api/resetCheckCode',(req,res,next)=>{
  api.resetPswCheckCode(req,res,next)
})
// PC端重置密码
router.post('/api/resetPsw',(req,res,next) =>{
  api.resetPsw(req,res,next);
})
// 移动端重置密码
router.post('/api/mobileResetPsw',(req,res,next)=>{
  api.moblieresetpsw(req,res,next);
})
// 登录
router.post('/api/login',(req,res,next) =>{
  api.userLogin(req,res,next)
})
// 更新用户喜爱的球队和球员
router.post('/api/updatePt',(req,res,next) =>{
  api.Updatept(req,res,next)
})
// 获取数据
router.post('/api/getPt',(req,res,next) =>{
  api.getPt(req,res,next)
})
// 上传文件
router.post('/api/upload',upload.single('myfile'),(req,res,next) =>{
  api.storeImg(req,res,next)
})

// 查询球队新闻
router.post('/api/getTeamNews',(req,res,next)=>{
  api.getTeamNews(req,res,next)
})

// 查询热门球星
router.get('/api/getHotPlayer',(req,res,next)=>{
  api.getHotPlayer(req,res,next)
})

// 查询球队球员
router.post('/api/getPlayerByTeam',function(req,res,next){
  api.getPlayerByTeam(req,res,next)
})

// 移动端登录
router.post('/api/mobileLogin',(req,res,next)=>{
  api.mobileLogin(req,res,next)
})

// 修改昵称
router.post('/api/modifyNc',(req,res,next)=>{
  api.modifyNc(req,res,next);
})

// 修改密码
router.post('/api/modifyPsw',(req,res,next)=>{
  api.modifyPsw(req,res,next);
})

// 留言反馈
router.post('/api/recordMessage',(req,res,next)=>{
  api.recordMessage(req,res,next)
})

// 获取喜欢球员信息
router.post('/api/getLikePlayerInfor',(req,res,next)=>{
  api.getLikePlayerInfor(req,res,next)
})

// 更新喜欢球员以及获取球员信息
router.post('/api/updateAndGetPlayer',(req,res,next)=>{
  api.updateAndGetPlayer(req,res,next)
})

// 获取我的主队
router.post('/api/updateMyTeam',(req,res,next)=>{
  api.updateMyteam(req,res,next)
})

// 后台
// 后台登录
router.post('/api/sysLogin',(req,res,next)=>{
  api.sysLogin(req,res,next)
})

// 搜索球员--通过名字
router.post('/api/sysSearchPlayerByName',(req,res,next)=>{
  api.sysSearchPlayerByName(req,res,next)
})

// 搜索球员 --通过球队
router.post('/api/sysSearchPlayerByTeam',(req,res,next)=>{
  api.sysSearchPlayerByTeam(req,res,next)
})

// 保存、新增球员
router.post('/api/sysOperaPlayer',(req,res,next)=>{
  api.sysOperaPlayer(req,res,next)
})

// 上传球员头像
router.post('/api/sysuploadPlayerTx',upload.single('myfile'),(req,res,next)=>{
  api.sysUploadPlayerTx(req,res,next)
})

// 获取球员荣誉
router.get('/api/sysGetPlayerHonor',(req,res,next)=>{
  api.sysGetPlayerHonor(req,res,next)
})

// 新增球员荣誉
router.post('/api/sysAddPlayerHonor',(req,res,next)=>{
  api.sysAddPlayerHonor(req,res,next)
})

// 删除球员荣誉
router.post('/api/sysDelPlayerHonor',(req,res,next)=>{
  api.sysDeletePlayerHonor(req,res,next)
})

// 获取球员生涯数据
router.get('/api/sysGetPlayerCareer',(req,res,next)=>{
  api.sysGetPlayerCareer(req,res,next)
})

// 前台获取sql语句
router.post('/api/sysGetSql',(req,res,next)=>{
  api.sysGetSql(req,res,next)
})

// 删除球员生涯数据
router.post('/api/sysDelPlayerCareer',(req,res,next)=>{
  api.sysDelPlayerCareer(req,res,next);
})

// 保存、新增球队
router.post('/api/sysOperaTeam',(req,res,next)=>{
  api.sysOperaTeam(req,res,next)
})

// 删除新闻
router.post('/api/sysDelNews',(req,res,next)=>{
  api.sysDelNews(req,res,next);
})

// 分页获取赛程
router.get('/api/sysGetScheme',(req,res,next)=>{
  api.sysGetScheme(req,res,next)
})

// 筛选赛程
router.get('/api/sysFilterScheme',(req,res,next)=>{
  api.sysFilterSheme(req,res,next)
})

// 删除赛程
router.post('/api/sysDelScheme',(req,res,next)=>{
  api.sysDelScheme(req,res,next)
})

router.get('/api/sysGetMessage',(req,res,next)=>{
  api.sysGetMessage(req,res,next)
})

module.exports = router;
