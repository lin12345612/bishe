export const changeMsg = ({commit},payload) => {
    // console.log(payload);
    commit({
        type : 'mutationsMsg',     //对应于mutations.js文件中的方法
        msg : payload
    })
}
export const changeMsg1 = ({commit},payload) => {
    console.log(payload);
    commit({
        type : 'mutationsMsg1',     //对应于mutations.js文件中的方法
        msg : payload
    })
}