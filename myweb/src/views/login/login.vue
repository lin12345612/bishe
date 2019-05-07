<template>
    <div>
        <el-dialog
            :close-on-click-modal="flag1"
            :visible="flag2"
            :before-close="handleClose"
            width="500px"
            custom-class="pop-login"
            center
        >
            <p class="login-titile-p">用户登录</p>
            <div class="common-input-div">
                <i class="myweb-icon-user input-common-icon"></i>
                <el-input
                    placeholder="请输入球员姓名"
                    v-model="user1"
                    clearable
                    @keyup.enter.native="userLogin"
                ></el-input>
            </div>
            <div class="common-input-div">
                <i class="myweb-icon-psw input-common-icon"></i>
                <el-input
                    placeholder="请输入密码"
                    v-model="user1"
                    clearable
                    type="password"
                    @keyup.enter.native="userLogin"
                ></el-input>
            </div>
            <p class="warm-p" v-if="warmShow">您输入的账号或者密码不正确</p>
            <div class="forget-psw-div"><p class="forget-psw-p" @click="handleSetPsw">忘记密码？</p></div>
            <el-button class="login-btn">登录</el-button>
            <div class="forget-psw-div register-div"><p class="register-p">还没有账号？<span @click="registerSpan" class="register-span">去注册</span></p></div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name : 'pop-login',
    data(){
        return {
            flag1:false,
            flag2 : true,
            user1 : '',
            psw : '',
            warmShow:false
        }
    },
    methods:{
        handleClose(){
           this.$store.dispatch('actChangeDlFlag',false)
        },
        userLogin(){

        },
        handleSetPsw(){

        },
        registerSpan(){

        }
    }
}
</script>

<style lang="scss">
    .pop-login{
        height: 350px;
        position: absolute;
        top:50%;
        left: 50%;
        margin: 0!important;
        transform: translate(-50%,-50%);
        .el-dialog__body{
            padding-top: 6px !important;
        }
        .login-btn{
            display: block;
            background:#f25a29;
            color:#fff;
            width:300px;
            margin:10px auto 0;
            font-size: 16px;
            
            &:hover{
                background:#f25a29;
                color:#fff;
            }
        }
        .warm-p{
            width: 300px;
            margin:  0 auto;
            color: #ff3b30;
        }
        .register-span{
            color: rgb(230, 88, 42);
            &:hover{
                cursor: pointer;
                text-decoration: underline;
            }
            
        }
        .register-div{
            margin-top: 10px;
        }
    }
    .common-input-div{
        width: 300px;
        height: 40px;
        position: relative;
        margin: 0 auto 20px;
        &:nth-of-type(2){
            margin-bottom: 10px;
        }
        input{
            width: 100%;
            // height: 36px;
            padding-left: 40px;
            &:focus{
                border:1px solid #f25a29;
            }
        }
        // span{
        //     top: 50%;
        //     transform: translateY(-50%);
        // }
        .input-common-icon{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 8px;
            font-size: 22px;
            z-index: 99;
        }
    }
    .login-titile-p{
        font-size: 20px;
        text-align: center;
        font-weight: bold;
        margin-bottom: 30px;
    }
    .forget-psw-div{
        width: 300px;
        height:20px;
        margin: 0 auto;
        display: flex;
        justify-content: flex-end;
        .forget-psw-p{
            &:hover{
                cursor: pointer;
                text-decoration: underline;
            }
        }
    }
    
    
</style>

