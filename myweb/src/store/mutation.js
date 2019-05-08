
export const changeMf = (state,index) =>{
    state.mf = index.mf
}

export const changeTf = (state,index)=>{
    state.tf = index.tf
}

export const changeDf = (state,index) =>{
    state.df = index.df
}

export const setProject = (state,item) =>{
    state.project = item.project
}

export const changePf = (state,flag) =>{
    state.pf = flag.pf
}
export const changeQy  = (state,xx) =>{
    state.qyxx = xx.qyxx
}
export const changeLg = (state,flag) =>{
    state.lg = flag.lg
}
export const changeUser = (state,name) =>{
    state.user = name.user
}

export const changeDlFlag = (state,flag) =>{
    state.dlFlag = flag.flag;
}

export const changeLogin = (state,flag) =>{
    state.login = flag.flag
}
export const changeRegiFlag = (state,flag) =>{
    state.regiFlag = flag.flag
}
export const changeResetFlag = (state,flag) =>{
    state.resetFlag = flag.flag
}