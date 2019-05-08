<template>
    <div>
        <el-dialog
            :visible="flag2"
            :close-on-click-modal="flag1"
            width="550px"
            custom-class="pop-reset"
            :before-close="handleClose"
            title="重置密码"
        >
            <el-steps :active="currStep" finish-status="success" simple>
                <el-step title="步骤 1" ></el-step>
                <el-step title="步骤 2"></el-step>
                <el-step title="步骤 3"></el-step>
            </el-steps>
            <div class="fill-input-div">
                <div class="step-cover-div" v-show="currIndex == 1 "> 
                    <el-input 
                        placeholder="请输入账号"
                        prop="user"
                        v-model="user1"
                        :class="{'user-warm-p': noValue}"
                        @blur="showWarm"
                        >
                    </el-input>
                    <div class="code-div">
                        <el-input
                            placeholder="请输入验证码"
                            v-model="yzm"
                            clearable
                            :class="{'codeWarm':noCodeValue}"
                            @blur="codeShowWarm"
                        ></el-input>
                        <section class="get-code-sec">
                            <el-button @click="getCode" class="get-code-btn" :disabled="clickable">{{codeText}}</el-button>
                        </section>
                    </div>
                    <p class="warm-p" v-if="warmFlag">{{warmP}}</p>
                </div>
                <div class="step-cover-div" v-show="currIndex == 2">
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="密码" prop="pass">
                            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <p class="success-reset-p" v-if="currIndex == 3">密码重置成功！</p>
                <button class="next-step-btn" @click="getNext">{{btnText}}</button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name : 'resetPassword',
    data(){
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            flag1 :false,
            flag2 :true,
            currStep: 0,
            codeText : '点击获取验证码',
            currIndex :1,
            clickable:false,
            yzm:'',
            user1 : '',
            warmP : '验证码错误',
            warmFlag :false,
            btnText :'下一步',
            noValue : false,
            noCodeValue :false,
            ruleForm: {
                pass: '',
                checkPass: ''
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        handleClose(){
            this.$store.dispatch('actChangeResetFlag',false)
        },
        getCode(){
            var num = 60;
            var _this = this;
            var timer = setInterval(function(){
                num--;
                if(num == 0){
                    clearInterval(timer);
                    num = 60;
                    _this.clickable = false;
                    _this.codeText = '未收到？点击获取'
                    return;
                }
                _this.codeText = num + 's'
                _this.clickable = true;

            },1000)
        },
        getNext(){
            if(this.currIndex == 1){
                if(this.user1 == ''){
                    this.noValue = true;
                }else if(this.yzm == ''){
                    this.noCodeValue  = true;
                }else{
                    this.currIndex++;
                    this.currStep++;
                }
            }else if(this.currIndex == 2){
                this.$refs.ruleForm.validate((valid) =>{
                    if(valid){
                        console.log('可以提交');
                        this.currIndex++;
                        this.currStep++;
                        this.btnText = '去登录'
                    }
                }) 
            }else{

            }
        },
        showWarm(){
            if(this.user1 == ''){
                this.noValue = true;
            }else{
                this.noValue = false;
            }
        },
        codeShowWarm(){
            if(this.yzm == ''){
                this.noCodeValue  = true;
            }else{
                this.noCodeValue  = false
            }
        }
    }
}
</script>

<style lang="scss">
    .pop-reset{
        height: 360px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        margin: 0!important;
        .next-step-btn{
            display: block;
            background:#f25a29;
            color:#fff;
            width:50%;
            margin:40px auto 0;
            font-size: 16px;
            border:none;
            border-radius: 3px;
            height: 40px;
            line-height: 40px;
            cursor: pointer;
        }
        .success-reset-p{
            width: 100%;
            height:100px;
            line-height: 100px;
            text-align: center;
            font-size: 20px;
            font-weight: 600;
        }
        .warm-p{
            width: 100%;
            margin:  8px auto 0;
            color: #ff3b30;
        }
        .el-dialog__body{
            padding: 0px!important;
        }
        .el-steps--simple{
            background-color: #fff;
        }
        .el-step__title.is-process {
            font-weight: 600;
            color: #666;
        }
        .el-step__head.is-process{
            color: #666;
            border-color: #666;
        }
        .fill-input-div{
            width: 450px;
            margin: 20px auto;
        }
        input{
            &:focus{
                border:1px solid #f25a29;
            }
        }
        .code-div{
            width: 100%;
            padding:0 180px 0 0px;
            position: relative;
            height: 40px;
            margin-top: 25px;
        }
        .get-code-sec{
            width: 170px;
            height: 40px;
            position: absolute;
            top: 0;right:0;
            .get-code-btn{
                width: 100%;
                height: 100%;
                padding: 0;
            }
        }
        .user-warm-p{
            input{
                border: 1px solid #f25a29;
            }
            &:before{
                content : '请输入账号';
                display: block;
                position: absolute;
                left: 0;
                top:42px;
                font-size: 12px;
                color: #f56c6c;
            }
        }
        .codeWarm{
            input{
                border: 1px solid #f25a29;
            }
            &:before{
                content : '请输入验证码';
                display: block;
                position: absolute;
                left: 0;
                top:42px;
                font-size: 12px;
                color: #f56c6c;
            }
        }
    }
</style>

