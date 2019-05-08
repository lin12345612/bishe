const sendMail = require('./nodemailer/mailer.js');
var mail1 = {
    from   : 'nbachat@foxmail.com',   //发件人
    subject : '验证码'  ,  //邮件主题
    to : '2482705542@qq.com',
    text : '您好，验证码为：601520，请勿泄露！'
}
sendMail(mail1);