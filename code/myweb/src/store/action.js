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