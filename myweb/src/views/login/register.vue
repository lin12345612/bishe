<template>
    <div>
        <el-dialog
            :close-on-click-modal="flag1"
            :before-close="handleClose"
            :visible="flag2"
            width="500px"
            custom-class="register-pop"
        >
        <p class="regi-title-p">用户注册</p>
        <div class="regi-main-div">
            <div class="regi-fill-div" v-if="!doneRegi">
                <el-form label-width="40px">
                    <el-form-item label="账号">
                        <el-input
                            placeholder="请输入邮箱"
                            v-model="yx"
                            clearable
                            @blur="checkAccount"
                            :class="{'wrong-p':wrongFlag,'empty-p':emptyFlag}"
                        ></el-input>
                        <p class="exist-p" v-if="existFlag" @click="linkLogin">账号已存在，去登录>></p>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-input
                            placeholder="请输入密码"
                            v-model="psw"
                            clearable
                            type="password"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div class="code-div">
                    <el-input
                        placeholder="请输入验证码"
                        v-model="yzm"
                        clearable
                    ></el-input>
                    <section class="get-code-sec">
                        <el-button @click="getCode" class="get-code-btn" :disabled="clickable">{{btnText}}</el-button>
                    </section>
                </div>
                <p class="warm-p" v-if="warmFlag">{{warmText}}</p>
            </div>
            <p class="finished-p" v-if="doneRegi">恭喜您，注册成功</p>
            <button class="register-btn" @click="userRegi">{{regiBtn}}</button>
        </div>
        </el-dialog>
    </div>
</template>
<script>
import { setInterval, clearInterval } from 'timers';
import {checkAccount,sendCode,checkCode} from '@/api/myApi.js';
export default {
    name : 'register',
    data(){
        return {
            flag1 : false,
            flag2 : true,
            yx : '',
            psw : '',
            yzm : '',
            btnText : '点击获取验证码',
            clickable : false,
            warmText : '验证码错误',
            warmFlag : false,   
            doneRegi :false,   //注册是否成功标志
            wrongFlag : false, //账号格式标志
            existFlag :false ,  //账号是否已存在
            emptyFlag:false,   //账号是否为空
            zhFlag   : false,  //账号校验完成
            regiBtn : '注册'
        }
    },
    methods:{
        handleClose(){
            this.$store.dispatch('actChangeRegiFlag',false)
        },
        // 邮箱核对
        checkAccount(){
            var yxRule = /^([A-Za-z0-9])\w+@[A-Za-z0-9]+\.([a-zA-A]{2,4})$/;
            this.warmFlag = false;
            if(this.yx == ''){
                this.wrongFlag = false;
                this.emptyFlag = true;
            }else{
                this.emptyFlag = false;
                if(!this.yx.match(yxRule)){
                    this.wrongFlag = true;
                }else{
                    this.wrongFlag = false;
                    this.emptyFlag = false;
                    // 邮箱是否存在查看
                    checkAccount(this.yx).then((data)=>{
                        if(data.data.info){
                            this.existFlag = true
                        }else{
                            this.zhFlag = true
                        }
                    }).catch(err => console.log(err))
                }
            }
        },
        linkLogin(){
            this.$store.dispatch('actChangeRegiFlag',false)
            this.$store.dispatch('actChangeResetFlag',false)
            this.$store.dispatch('actChangeDlFlag',true)
        },
        // 注册按钮
        userRegi(){
            //注册按钮
            if(this.regiBtn == '注册'){
                if(this.zhFlag){
                    if(this.psw == ''){
                        this.warmText = '请输入密码';
                        this.warmFlag = true;
                    }else if(this.yzm == ''){
                        this.warmText = '请输入验证码';
                        this.warmFlag = true;
                    }else{
                        var info = {
                            user : this.yx,
                            psw  : this.psw,
                            code : this.yzm
                        }
                        checkCode(info).then((data)=>{
                            if(data.data.regi){   //注册成功
                                this.doneRegi = true;
                                this.regiBtn = '去登录'
                            }
                        }).catch(err => console.log(err))
                    }
                }
            }else{   //登陆跳转
                this.$store.dispatch('actChangeRegiFlag',false);   //当前弹窗隐藏
                this.$store.dispatch('actChangeDlFlag',true)        //登陆弹窗显示
            }
        },
        // 获取验证码
        getCode(){
            if(this.zhFlag){
                this.warmFlag = false;
                var num = 60;
                var _this = this;
                var timer = setInterval(function(){
                    num--;
                    if(num == 0){
                        clearInterval(timer);
                        num = 60;
                        _this.clickable = false;
                        _this.btnText = '未收到？点击获取'
                        return;
                    }
                    _this.btnText = num + 's后重新获取'
                    _this.clickable = true;

                },1000)
                sendCode(this.yx).then(data =>{
                    console.log(data.data);
                }).catch(err => console.log(err))
            }else{
                this.warmText = '请输入正确的账号';
                this.warmFlag = true;
            }
        }
    }
}
</script>
<style lang="scss">
    .register-pop{
        height: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        margin: 0 !important;
        .el-dialog__body{
            padding-top: 6px !important;
        }
        .warm-p{
            width: 270px;
            margin:  8px auto 0;
            color: #ff3b30;
        }
        .register-btn{
            display: block;
            background:#f25a29;
            color:#fff;
            width:100%;
            margin:30px auto 0;
            font-size: 16px;
            border:none;
            border-radius: 3px;
            height: 40px;
            line-height: 40px;
            cursor: pointer;
            &:hover{
                background:#f25a29;
                color:#fff;
            }
            &:active{
                background:#f25a29;
                color:#fff;
            }
        }
    }
    .regi-title-p{
        font-size: 20px;
        text-align: center;
        font-weight: bold;
        margin-bottom: 30px;
    }
    .regi-main-div{
        width: 350px;
        margin: 0 auto;
        input{
            // padding-left: 40px;
            &:focus{
                border:1px solid #f25a29;
            }
        }
    }
    .code-div{
        width: 100%;
        padding:0 150px 0 40px;
        position: relative;
        height: 40px;
    }
    .get-code-sec{
        width: 140px;
        height: 40px;
        position: absolute;
        top: 0;right:0;
        .get-code-btn{
            width: 100%;
            height: 100%;
            padding: 0;
        }
    }
    .finished-p{
        font-size: 22px;
        line-height: 164px;
        height: 164px;
        text-align: center;
        font-weight: bold;
    }
    .wrong-p{
        input{
            border: 1px solid #f25a29;
        }
        &:before{
            content : '账号格式不正确';
            display: block;
            position: absolute;
            left: 0;
            top:30px;
            font-size: 12px;
            color: #f56c6c;
        }
    }
    .exist-p{
        position: absolute;
        left: 0;
        top: 44px;
        font-size: 12px;
        line-height: 1;
        color: #f25a29;
        cursor: pointer;
    }
    .empty-p{
        input{
            border: 1px solid #f25a29;
        }
        &:before{
            content : '请输入账号';
            display: block;
            position: absolute;
            left: 0;
            top:30px;
            font-size: 12px;
            color: #f56c6c;
        }
    }
</style>

