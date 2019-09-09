const jwt = require('jsonwebtoken');

// 创建token类
class JWT{
    constructor(data){
        this.data = data;
        this.my = 'woshimeizhilansuiliaodemiyao'
    }

    // 生成token
    createToken(){
        let _data = this.data;
        let _my = this.my;
        let token = jwt.sign({_data},_my,{expiresIn:'1day'});
        return token;
    }

    // 校验token
    checkToken(){
        let token = this.data;
        let _my = this.my;
        let res = null;
        let result = jwt.verify(token,_my,(err,decoded) =>{
            if(err){    //校验不成功
                return 'false';
            }
            return 'true';
        })
        return result;
    }
}
module.exports = JWT;