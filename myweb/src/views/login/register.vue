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
            <el-form label-width="40px">
                <el-form-item label="账号">
                    <el-input
                        placeholder="请输入邮箱"
                        v-model="yx"
                        clearable
                    ></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input
                        placeholder="请输入密码"
                        v-model="psw"
                        clearable
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
            <el-button class="register-btn">注册</el-button>
        </div>
        </el-dialog>
    </div>
</template>
<script>
import { setInterval, clearInterval } from 'timers';
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
            warmFlag : false
        }
    },
    methods:{
        handleClose(){
            this.$store.dispatch('actChangeRegiFlag',false)
        },
        userRegi(){

        },
        // 获取验证码
        getCode(){
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
                _this.btnText = num + 's'
                _this.clickable = true;

            },1000)
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
            
            &:hover{
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
</style>

