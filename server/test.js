const sendMail = require('./nodemailer/mailer.js');
var mail1 = {
    from   : 'nbachat@foxmail.com',   //发件人
    subject : '验证码'  ,  //邮件主题
    to : '995778132@qq.com',
    // text : '您好，验证码为：601520，请勿泄露！'
    html : ` <div style="overflow:hidden;width:400px;height:300px;position:relative;border-radius:5px;box-shadow:0 4px 8px rgba(0,0,0,.5);background: #f5f5f5;box-sizing: border-box;margin: 0 auto;">
    <div style="width: 100%;height: 40px;background: rgb(242, 90, 41);" ></div>
    <p style="text-indent: 2rem;margin:20px 0;">尊敬的用户，本次的验证码为</p>
    <p style="width: 120px;height:40px;border-radius:5px;text-align:center;line-height:40px;color:rgb(242, 90, 41);font-size: 30px;margin: 30px auto;">685495</p>
    <p style="color: #979797;text-indent: 2rem;">验证码一分钟内有效，打死都不要告诉别人哦</p>
</div>`
}
sendMail(mail1);
// var arr = ['11111','22222'];
// let str = '';
// for(var f = 0 ; f < arr.length ; f++){
//     if(f != arr.length -1){
//         str += `(10,'${arr[f]}'),`
//     }else{
//         str += `(10,'${arr[f]}');`
//     }
// }
// console.log(str);