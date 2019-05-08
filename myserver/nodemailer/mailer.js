const nodeMailer = require('nodemailer');


async function sendMailer(mail){
    // 创建smtp服务器
    const config = {
        host : 'smtp.qq.com',
        port : 587,
        auth : {
            user :'nbachat@foxmail.com',
            pass : 'gcttchtjtxtqbjeg'
        }
    };
    const transporter =  nodeMailer.createTransport(config);
    await transporter.sendMail(mail,(error,info)=>{
        if(error){
            return console.log(error);
        }
        console.log('mail sent',info.response);
    })
}
module.exports = sendMailer;

