export const mutationsMsg = (state,payload) => {
    state.msg = payload;
}
export const mutationsMsg1 = (state,payload) => {
    // console.log(payload);
    state.msg1 = payload.msg;
}