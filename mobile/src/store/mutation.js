// 修改页面标志位
export const changePage = (state,index)=>{
    state.currPage = index.index
}
// 修改球员排行的数据
export const changeDataArr = (state,obj) =>{
    state.dataArr[obj.obj.curr].push(...obj.obj.arr)
}

// 存储所有球队信息
export const storeTeamInfor = (state,obj)=>{
    state.teamArr = obj.teamArr
}
// 存储西部球队个数
export const storeTeamNumber = (state,num)=>{
    state.westLen = num.num
}

// 登录设置
export const changeLogin = (state,flag)=>{
    state.isLogin = flag.flag
}

// 修改用户头像
export const changeTx = (state,src)=>{
    state.tx = src
}
// 用户账号
export const changeUser = (state,user)=>{
    state.user = user
}

// 用户昵称
export const changeNc = (state,nc)=>{
    state.nc = nc 
}

// 设置显示
export const changeXs = (state,xs)=>{
    state.yhText = xs
}

// 设置路由名
export const changeRoute = (state,ly)=>{
    state.routeName = ly;
}

// 设置参数
export const changeParams = (state,xx)=>{
    state.queryParam = xx;
}

// 设置喜欢球队
export const changeQd = (state,qd)=>{
    state.xhqd = qd;
}

// 设置喜欢球星
export const changeQx = (state,qx)=>{
    state.xhqx = qx;
}