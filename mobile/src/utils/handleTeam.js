
export function  handleTeam(team){
    let _team = '';
    if(team.includes("休斯顿")){
        _team = team.split("休斯顿")[1]
    }else if(team.includes("圣安东尼奥")){
        _team = team.split("圣安东尼奥")[1]
    }else if(team.includes("孟菲斯")){
        _team = team.split("孟菲斯")[1]
    }else if(team.includes("新奥尔良")){
        _team = team.split("新奥尔良")[1]
    }else if(team.includes("达拉斯")){
        _team = team.split("达拉斯")[1]
    }else if(team.includes("金州")){
        _team = team.split("金州")[1]
    }else if(team.includes("洛杉矶")){
        _team = team.split("洛杉矶")[1]
    }else if(team.includes("萨克拉门托")){
        _team = team.split("萨克拉门托")[1]
    }else if(team.includes("菲尼克斯")){
        _team = team.split("菲尼克斯")[1]
    }else if(team.includes("丹佛")){
        _team = team.split("丹佛")[1]
    }else if(team.includes("波特兰")){
        _team = team.split("波特兰")[1]
    }else if(team.includes("俄克拉荷马")){
        _team = team.split("俄克拉荷马")[1]
    }else if(team.includes("犹他")){
        _team = team.split("犹他")[1]
    }else if(team.includes("明尼苏达")){
        _team = team.split("明尼苏达")[1]
    }else if(team.includes("西雅图")){
        _team = team.split("西雅图")[1]
    }else if(team.includes("密尔沃基")){
        _team = team.split("密尔沃基")[1]
    }else if(team.includes("多伦多")){
        _team = team.split("多伦多")[1]
    }else if(team.includes("费城")){
        _team = team.split("费城")[1]
    }else if(team.includes("波士顿")){
        _team = team.split("波士顿")[1]
    }else if(team.includes("新泽西")){
        _team = team.split("新泽西")[1]
    }else if(team.includes("布鲁克林")){
        _team = team.split("布鲁克林")[1]
    }else if(team.includes("纽约")){
        _team = team.split("纽约")[1]
    }else if(team.includes("迈阿密")){
        _team = team.split("迈阿密")[1]
    }else if(team.includes("奥兰多")){
        _team = team.split("奥兰多")[1]
    }else if(team.includes("夏洛特")){
        _team = team.split("夏洛特")[1]
    }else if(team.includes("华盛顿")){
        _team = team.split("华盛顿")[1]
    }else if(team.includes("亚特兰大")){
        _team = team.split("亚特兰大")[1]
    }else if(team.includes("印第安纳")){
        _team = team.split("印第安纳")[1]
    }else if(team.includes("底特律")){
        _team = team.split("底特律")[1]
    }else if(team.includes("芝加哥")){
        _team = team.split("芝加哥")[1]
    }else if(team.includes("克里夫兰")){
        _team = team.split("克里夫兰")[1]
    }
    return _team;
}