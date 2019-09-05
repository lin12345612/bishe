const state = {
    // 选中标志位
    currPage : 0,
    // 球员数据排行数据存储
    dataArr : [[],[],[],[],[],[]],
    // 所有球队
    teamArr :[],
    // 西部球队个数
    westLen : 0,
    isLogin : false,
    tx : '',   //头像链接
    user :'',  //用户
    nc  : '',  //用户昵称 
    yhText : '点击登录', //显示称呼
    routeName : '',   //存储即将跳转的路由
    queryParam : '',  //参数
    xhqd    : '',    //喜欢球队
    xhqx    : ''    //喜欢球星
}
export default state;