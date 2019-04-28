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