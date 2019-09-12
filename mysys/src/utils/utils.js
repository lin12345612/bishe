module.exports={
    recordTime(time){
        let _time = time ? new Date(time) : new Date();
        let _yy = _time.getFullYear();
        let _mm = _time.getMonth()+1 ;
        let _dd = _time.getDate();
        _mm = _mm > 9 ? _mm : '0' + _mm;
        _dd = _dd > 9 ? _dd : '0' + _dd;
        return `${_yy}-${_mm}-${_dd}`   
    },
}