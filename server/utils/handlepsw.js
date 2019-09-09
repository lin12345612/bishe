const Base64 = require('./base64.js');
const crypto = require('crypto');
const base = new Base64();
module.exports={
    pswEnCode(psw,str){
        const hash = crypto.createHash('sha1');
        let _str = base.encode(psw)+base.encode(str);
        let jg = base.encode(_str)
        return hash.update(jg).digest('hex');
    },
    recordTime(time){
        let _time = time ? new Date(time) : new Date();
        let _yy = _time.getFullYear();
        let _mm = _time.getMonth()+1 ;
        let _dd = _time.getDate();
        _mm = _mm > 9 ? _mm : '0' + _mm;
        _dd = _dd > 9 ? _dd : '0' + _dd;
        let _hh = _time.getHours();
        let _ff = _time.getMinutes();
        let _ss = _time.getSeconds();
        _hh = _hh > 9 ? _hh : '0' + _hh;
        _ff = _ff > 9 ? _ff : '0' + _ff;
        _ss = _ss > 9 ? _ss : '0' + _ss;
        return `${_yy}-${_mm}-${_dd} ${_hh}:${_ff}:${_ss}`   
    },
    // 处理ip地址
    handleIp(ip){
        let _index = ip.lastIndexOf(':')+1;
        let str1 = ip.substr(_index);
        return str1
    }
}