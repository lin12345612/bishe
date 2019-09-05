// 修改当前页
export const actChangePage = ({commit},index)=>{
    commit({
        type : 'changePage',
        index : index
    })
}

// 球员排行数据
export const actChangeDataArr = ({commit},obj)=>{
    commit({
        type : 'changeDataArr',
        obj : obj
    })
}

// 存储球队信息
export const actStoreTeamArr = ({commit},obj)=>{
    commit({
        type : 'storeTeamInfor',
        teamArr : obj
    })
}

// 存储西部球队个数
export const actStoreNum = ({commit},num)=>{
    commit({
        type : 'storeTeamNumber',
        num : num
    })
}

// 改变登录状态
export const actChangeLogin = ({commit},flag)=>{
    commit({
        type :'changeLogin',
        flag :flag
    })
}