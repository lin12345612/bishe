<template>
    <div class="register-outer-div">
        <my-head :title="title"></my-head>
        <div class="register-div" :class="{'posi1':!isDone,'posi2':isDone}">
            <div class="left-div">
                <div class="pic-div">
                    <img src="../../assets/logo1.png">
                </div>
                <div class="input-common-div">
                    <input type="text" v-model="user" @blur="userCheck" class="zhanghao-input common-input" placeholder="请输入邮箱进行注册">
                </div>
                <p class="regi-warm-p" v-if="ifExist">{{userText}}</p>
                <div class="yzm-div">
                    <div class="get-code-div">
                        <get-code :ischeck="ischeck" @cfGetCode='reqCode'></get-code>
                    </div>
                    <div class="input-common-div yzm-inner-div">
                        <input type="text" v-model="yzm" class="yzm-input common-input" placeholder="请输入验证码">
                    </div>
                </div>
                <p class="regi-warm-p" v-if="ifyzm">{{yzmText}}</p>
                <div class="input-common-div">
                    <input type="text" v-model="psw" class="zhanghao-input common-input" placeholder="请输入密码">
                </div>
                <p class="regi-warm-p" v-if="ifpsw">请输入密码</p>
                <button class="register-btn" @click="regiBtnClick">注册</button>
            </div>
            <div class="right-div">
                <span class="gou-span"></span>
                <p class="register-p">恭喜您，注册成功</p>
                <button class="back-btn" @click="toUser">去登录</button>
            </div>
        </div>
    </div>
</template>
<script>
import MyHead from '@/components/head.vue'
import GetCode from './component/sendCode'
import {checkAccount,regiGetCode,register} from '@/api/myapi'
export default {
    name : 'register',
    components:{MyHead,GetCode},
    data(){
        return {
            title :'注册',
            isDone : false,
            ifExist :false,   //账号是否存在
            ifyzm  : false,    // 验证码提示
            ifpsw : false  ,   //密码提示 
            user: '' ,   //账号
            yzm : '', // 验证码
            psw :'',  //密码
            userText :'',
            ischeck : false,  //用于判断是否发送验证码
            yzmText  : '请输入验证码',
        }
    },
    methods:{
        // 邮箱校验
        userCheck(){
            let _count = /^((w{3}.)?)([a-zA-Z0-9]+)@(126|163|qq).com/ 
            if(this.user){
                this.ischeck = false;
                if(this.user.match(_count)){
                    checkAccount(this.user).then(res=>{
                        if(res.data.info){
                            this.userText = '您输入的邮箱账号已存在'
                            this.ifExist = true
                        }else{
                            this.ischeck = true;
                            this.ifExist = false;
                        }
                    }).catch(err=>{console.log(err);})
                }else {
                    this.userText = '邮箱格式出错，输入正确的邮箱'
                    this.ifExist = true;
                }
            }else{
                this.ischeck = false;
                this.userText = '输入邮箱'
                this.ifExist = true;
            }

        },
        reqCode(){
            if(this.ischeck){
                regiGetCode(this.user,'false').then(req=>{
                    console.log(req.data);
                })
            }else{
                this.userText = '请输入正确的邮箱'
                this.ifExist = true;
            }
        },
        // 注册按钮
        regiBtnClick(){
            if(!this.ischeck){
                this.userText = '请输入正确的邮箱'
                this.ifExist = true;
            }else if(!this.yzm){
                this.yzmText = '请输入验证码'
                this.ifyzm = true;
                this.ifExist = false;
                this.ifpsw = false;
            }else if(!this.psw){
                this.ifyzm = false;
                this.ifExist = false;
                this.ifpsw = true;
            }else{
                this.ifyzm = false;
                this.ifpsw = false
                this.ifExist = false;
                register(this.user,this.psw,this.yzm).then(res=>{
                    if(res.data.regi){
                        this.isDone = true;
                    }else{
                        if(res.data.wrongUser){
                            this.yzmText = "请重新获取验证码";
                            this.ifyzm = true
                        }else{
                            this.yzmText = "验证码错误，请重新输入";
                            this.ifyzm = true
                        }
                    }
                })
            }
        },
        // 返回登录页
        toUser(){
            this.$router.push({
                name : 'user'
            })
        }
    }

}
</script>
<style lang="scss" scoped>
    .btn-tbn{
        position: fixed;
        right: 0;
        top: 0;
        z-index: 900;
    }
    .register-outer-div{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .posi1{
        left: 0;
    }
    .posi2{
        left: -100%;
    }
    .register-div{
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        padding-top: 120px;
        transition: left .5s linear;
        p,div,section,span,input{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        .left-div{
            position: absolute;
            top: 120px;
            left: 0;
            width: 100%;
            height: 100%;
        }
        .right-div{
            position: absolute;
            top: 120px;
            left: 100%;
            width: 100%;
            height: 100%;
            padding: 0 20px;
        }
        .pic-div{
            width: 234px;
            height: auto;
            margin: 0px auto 60px;
            img{
                display: block;
                width: 100%;
            }
        }
        .yzm-div{
            width: 75%;
            height: 40px;
            position: relative;
            padding-right: 120px;
            margin: 20px auto 0px;
        }
        .input-common-div{
            width: 75%;
            height: 40px;
            border: 1px solid rgba(242,90,41,.3);
            border-radius: 5px;
            margin: 20px auto 0;
            position: relative;
            overflow: hidden;
        }
        .yzm-inner-div{
            width: 100%;
        }
        .common-input{
            width: 100%;
            height: 100%;
            border: none;
            padding-left:10px; 
        }
        .get-code-div{
            position: absolute;
            right: 0;
            top: 0;
            width: 100px;
            height: 40px;
        }
        .register-btn{
            display: block;
            width: 75%;
            height: 35px;
            margin: 20px auto 0;
            background: rgb(242,90,41);
            border: none;
            color: #fff;
            cursor: pointer;
            border-radius: 5px;
        }
        .regi-success-div{
            width: 300px;
            height: 200px;
            box-shadow: 0 0 3px rgba(0,0,0, .3);
            border-radius: 5px;
        }
        .gou-span{
            display: block;
            width: 150px;
            height: 150px;
            margin:  0 auto 40px;
            background: url('../../assets/gou.png') no-repeat center center ;
            background-size: 100% 100%;
        }
        .register-p{
            font-size: 20px;
            text-align: center;
        }
        .back-btn{
            display: block;
            width: 150px;
            height: 40px;
            border-radius: 20px;
            background-color: #f25a29;
            cursor: pointer;
            margin: 60px auto 0;
            border: none;
            color: #fff;
            font-size: 14px;
        }
        .regi-warm-p{
            width: 75%;
            margin: 5px auto 0;
            font-size: 14px;
            color: #f25a29;
        }
    }
</style>
