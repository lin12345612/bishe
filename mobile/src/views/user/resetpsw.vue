<template>
    <div class="resetpsw-div" >
        <common-head :title="title"></common-head>
        <div class="resetpsw-inner-div">
            <div class="resetpsw-common-div step-two-div" :class="{'show-scale':step2Done}">
                <span class="gou-span"></span>
                <p class="register-p">密码重置成功</p>
                <button class="back-btn" @click="toUser">去登录</button>
            </div>
            <div class="resetpsw-common-div step-one-div" :class="{'hide-scale':step1Done}">
                <div class="input-common-div">
                    <input type="text" v-model="user" @blur="userCheck" class="zhanghao-input common-input" placeholder="请输入邮箱">
                </div>
                <p class="regi-warm-p" v-if="ifExist">{{userText}}</p>
                <div class="yzm-div">
                    <div class="get-code-div">
                        <get-code :ischeck="ischeck" @cfGetCode='reqCode' v-if="ifcode"></get-code>
                    </div>
                    <div class="input-common-div yzm-inner-div">
                        <input type="text" v-model="yzm" class="yzm-input common-input" placeholder="请输入验证码">
                    </div>
                </div>
                <p class="regi-warm-p" v-if="ifyzm">{{yzmmsg}}</p>
                <div class="input-common-div">
                    <input type="password" v-model="psw1" class="zhanghao-input common-input" placeholder="请输入密码">
                </div>
                <div class="input-common-div">
                    <input type="password" v-model="psw2" class="zhanghao-input common-input" placeholder="请再次输入密码">
                </div>
                <p class="regi-warm-p" v-if="ifsame">{{pswWarm}}</p>
                <button class="resetpsw-btn" @click="resetBtnClick">提交</button>
            </div>
        </div>
    </div>
</template>
<script>
import CommonHead from '@/components/head.vue'
import getCode from './component/sendCode';
import {checkAccount,regiGetCode,resetpsw} from '@/api/myapi'
export default {
    name : 'resetpsw',
    components:{CommonHead,getCode},
    beforeRouteLeave(to,from,next){
        this.step1Done = false;
        this.step2Done = false;
        this.user  = '';
        this.ifExist = false;
        this.ischeck = false;
        this.yzm = '';
        this.ifyzm = false;
        this.psw1 = '';
        this.psw2 = '';
        this.ifsame = false;
        this.ifcode = true;
        next()
    },
    data(){
        return {
            title:'重置密码',
            step1Done : false, 
            step2Done : false,
            user : '',
            ifExist :false, //账号显示判断
            userText :'请输入正确的邮箱格式',   //账号提示
            ischeck :false,
            yzm :'',
            ifyzm : false,
            yzmmsg : '请输入验证码',
            psw1 : '',
            psw2 : '',
            ifsame : false,
            pswWarm : '请输入密码',
            ifcode : true
        }
    },
    methods:{
        userCheck(){
            let _count = /^((w{3}.)?)([a-zA-Z0-9]+)@(126|163|qq).com/ 
            if(this.user){
                this.ischeck = false;
                if(this.user.match(_count)){
                    checkAccount(this.user).then(res=>{
                        if(!res.data.info){
                            this.userText = '您输入的邮箱账号不存在'
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
                regiGetCode(this.user,'true').then(req=>{
                    console.log(req.data);
                })
            }else{
                this.userText = '请输入正确的邮箱'
                this.ifExist = true;
            }
        },
        resetBtnClick(){
            if(!this.ischeck){
                this.userText = '请输入正确的邮箱'
                this.ifExist = true;
                this.ifpsw = false;
                this.ifsame = false;
            }else if(!this.yzm){
                this.yzmText = '请输入验证码'
                this.ifyzm = true;
                this.ifExist = false;
                this.ifpsw = false;
                this.ifsame = false;
            }else if(!this.psw1){
                this.ifExist = false;
                this.ifyzm = false;
                this.pswWarm = '请输入密码';
                this.ifsame = true;
            }else if(!this.psw2){
                this.ifExist = false;
                this.ifyzm = false;
                this.pswWarm = '请再次输入密码';
                this.ifsame = true;
            }else if(this.psw1 != this.psw2){
                this.ifExist = false;
                this.ifyzm = false;
                this.pswWarm = '两次输入的密码不一致';
                this.ifsame = true;
            }else{
                this.ifExist = false;
                this.ifyzm = false;
                this.ifsame = false;
                resetpsw(this.user ,this.psw1,this.yzm).then(res=>{
                    if(res.data.success){
                        this.step1Done = true;
                        this.step2Done = true;
                        this.ifcode = false;
                    }else{
                        this.yzmText = '验证码错误'
                        this.ifyzm = true;
                    }
                })
            }
        },
        toUser(){
            this.$router.push({
                name : 'user'
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .resetpsw-div{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        padding: 40px 0 20px;
        div,span,p{
            box-sizing: border-box;
        }
        .resetpsw-inner-div{
            width: 100%;
            height: 100%;
            position: relative;
        }
        .resetpsw-common-div{
            width: 100%;
            height:100%;
            transition: all 1s ease-in-out;
            padding-top: 40px ;
        }
        .step-one-div{
            transform-origin: bottom left;
            position: relative;
        }
        .step-two-div{
            position: absolute;
            transform: scale(0,0);
            transform-origin: top right;
            padding-top: 60px;
        }
        .show-scale{
            transform: scale(1,1)
        }
        .hide-scale{
            transform: scale(0,0,)
        }
        .change-posi{
            transform-origin: bottom left;
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
        .common-input{
            width: 100%;
            height: 100%;
            border: none;
            padding-left:10px; 
        }
        .yzm-div{
            width: 75%;
            height: 40px;
            position: relative;
            padding-right: 120px;
            margin: 20px auto 0px;
        }
        .get-code-div{
            position: absolute;
            right: 0;
            top: 0;
            width: 100px;
            height: 40px;
        }
        .yzm-inner-div{
            width: 100%;
        }
        .regi-warm-p{
            width: 75%;
            margin: 5px auto 0;
            font-size: 14px;
            color: #f25a29;
        }
        .resetpsw-btn{
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
    }
</style>

