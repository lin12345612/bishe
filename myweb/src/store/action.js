// 修改菜单标志位
export const actChangeMf = ({commit},index)=>{
    commit({
        type:'changeMf',
        mf : index
    })
}
// 修改球队页标志位，若是通过内容点击进入页面，则不触发该标志，不出现选择球队的页面
// 若通过导航栏点击则显示球队选择页面
export const actChangeTf = ({commit},index)=>{
    commit({
        type:'changeTf',
        tf :index
    })
}
// 修改数据排行标志位
export const actChangeDf = ({commit},index) =>{
    commit({
        type : 'changeDf',
        df : index
    })
}

// 传递值到弹窗
export const actSetProject = ({commit},index) =>{
    commit({
        type : 'setProject',
        project:index
    })
}

// 修改进入球员页面的标志
export const actChangePf = ({commit},index) =>{
    commit({
        type : 'changePf',
        pf : index
    })
}

// 修改球员信息
export const actSetQyxx = ({commit},xx) =>{
    commit({
        type : 'changeQy',
        qyxx : xx
    })
}

// 修改登陆框显示内容
export const actChangeLg = ({commit},flag) =>{
    commit({
        type :'changeLg',
        lg : flag
    })
}

// 修改用户
export const acytChangeUser = ({commit},name) =>{
    commit({
        type : 'changeUser',
        user : name
    })
}

// 登陆弹窗登陆显示标志
export const actChangeDlFlag = ({commit},flag) =>{
    commit({
        type :'changeDlFlag',
        flag : flag
    })
}

// 用户是否登陆的标志
export const actChangeLogin = ({commit},flag) =>{
    commit({
        type : 'changeLogin',
        flag:flag
    })
}

// 注册标志位修改
export const actChangeRegiFlag =({commit},flag) =>{
    commit({
        type : 'changeRegiFlag',
        flag:flag
    })
}