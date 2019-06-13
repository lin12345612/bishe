// 修改当前页
export const actChangePage = ({commit},index)=>{
    commit({
        type : 'changePage',
        index : index
    })
}