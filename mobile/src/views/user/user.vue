<template>
    <div class="user-div">
        <div class="unlogin-div" v-show="isLogin">
            <div class="gif-cover-div">
                <span class="pic-inner-span"></span>
            </div>
            <div class="input-div">
                <i class="myweb-icon-user set-posi"></i>
                <input type="text" class="common-input" v-model="user" placeholder="请输入账号">
            </div>
            <p class="common-warm-p" v-if="userWarm" >{{userText}}</p>
            <div class="input-div">
                <i class="myweb-icon-psw set-posi psw-icon"></i>
                <input type="password" class="common-input" v-model="psw" placeholder="请输入密码" @keyup.enter="login">
            </div>
            <p class="common-warm-p" v-if="pswWarm" >{{pswText}}</p>
            <button class="login-btn" @click="login">登录</button>
            <div class="opera-div">
                <p class="opera-p" @click="toResetPsw">忘记密码?</p >|<p class="opera-p" @click="toRegister">立即注册</p>
            </div>
        </div>
        <has-login v-show="!isLogin" @toLogin="handleLogin"></has-login>
    </div>
</template>
<script>
import {login} from '@/api/myapi.js'
import hasLogin from './personal';
export default {
    name :'user',
    components :{hasLogin},
    beforeRouteEnter (to, from, next) {
        // console.log(from.fullPath);
        // console.log(from.query);
        // console.log('路由参数',to);
        next(vm=>
        {
            vm.$store.dispatch('actChangePage',4)
            if(to.query.flag == true){    ///需要登录的
                console.log(from);
                vm.pName = from.name;
                vm.$store.commit('changeRoute',from.name)
                let _xx = null;
                if(from.name == 'teamInfor'){
                    _xx = from.query.team
                }else{
                    _xx = from.query.xx
                    _xx.isGz = true;
                }
                vm.$store.commit('changeParams',_xx)
                vm.isLogin = true;

            }
        });
    },
    beforeRouteLeave (to, from, next) {
      next(()=>{
          this.isLogin = true;
      })  
    },
    created(){
        this.$store.dispatch('actChangePage',4)
    },
    data(){
        return {
            psw :'',
            user:'',
            userWarm : false,
            userText : '请输入正确的账号',
            pswWarm :false,
            pswText :'请输入密码',
            isLogin : false ,
            pName : '' 
        }
    },
    methods:{
        login(){
            if(!this.user){
                this.userText = '请输入账号';
                this.userWarm = true;
                this.pswWarm = false;
            }else if(!this.psw){
                this.userWarm = false;
                this.pswText = '请输入密码'
                this.pswWarm = true;
            }else{
                login(this.user,this.psw).then(res=>{
                    if(res.data.success){
                        this.userWarm = false;
                        this.pswWarm = false;
                        this.$store.dispatch('actChangeLogin',true)
                        this.$store.commit('changeTx',res.data.info.txSrc);
                        this.$store.commit('changeUser',res.data.info.user);
                        this.$store.commit('changeNc',res.data.info.nn == null ? '' : res.data.info.nn)
                        this.$store.commit('changeXs',res.data.info.nn == null ? res.data.info.user : res.data.info.nn);
                        this.$store.commit('changeQx',res.data.info.qx ? res.data.info.qx :'')
                        this.$store.commit('changeQd',res.data.info.qd ? res.data.info.qd :'')
                        let _ly = this.$store.state.routeName;
                        let _params = this.$store.state.queryParam;
                        this.isLogin = false;
                        if(_ly){
                            if(this.pName == 'playerInfor'){   //球员信息
                                this.$router.push({name : _ly,query : {xx :_params}})
                            }else{
                                this.$router.push({name : _ly,query : {team :_params,isGz : true}})
                            }
                        }
                        this.$store.commit('changeRoute','')
                    }else{
                        if(res.data.nouser){
                            this.userText = '账号不存在';
                            this.userWarm = true;
                            this.pswWarm = false;
                        }else{
                            this.userWarm = false;
                            this.pswText = '密码错误'
                            this.pswWarm = true;
                        }
                    }
                }).catch(err=>{console.log(err);})
            }
        },
        toRegister(){
            this.$router.push({name :'register'})
        },
        toResetPsw(){
            this.$router.push({name:'resetpsw'})
        },
        handleLogin(){
            this.isLogin = true;
        }
    }
}
</script>

<style lang="scss" scoped>
    .user-div {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding:40px 0px 50px;
        p,div,section,input,span,button{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        .unlogin-div{
            padding-top: 40px;
        }
        .gif-cover-div{
            width: 120px;
            height: 120px;
            border-radius: 50%;
            border: 1px solid rgba(242,90,41,.3);
            margin : 30px auto 45px;
            position: relative;
            .pic-inner-span{
                display: block;
                width: 114px;
                height: 114px;
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                background: url('../../assets/200_200.png') no-repeat center center;
                background-size: 100% 100%;
            }
        }
        .input-div{
            width: 70%;
            height: 40px;
            position: relative;
            margin:  20px auto;
            border: 1px solid rgba(242,90,41,.3);
            border-radius: 3px;
        }
        .common-input{
            width: 100%;
            height: 40px;
            background: rgba(255,255,255,.1);
            border: none;
            padding-left: 35px;
            font-size: 16px;
            box-shadow: none;
        }
        .set-posi{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 6px;
            color: rgba(0,0,0,.3);
            font-size: 24px;
        }
        .psw-icon{
            font-size: 20px;
            left: 8px;
        }
        .login-btn{
            display: block;
            width: 70%;
            height: 40px;
            background: #f25a29;
            color: #fff;
            font-size: 16px;
            cursor: pointer;
            border: none;
            margin : 40px auto 5px;
            border-radius: 5px;
            box-shadow: none;
        }
        .opera-div{
            display: flex;
            width: 70%;
            height: 30px;
            line-height: 30px;
            margin: 0 auto;
            justify-content: center;
        }
        .opera-p{
            cursor: pointer;
            &:nth-of-type(1){
                margin-right: 8px;
            }
            &:nth-of-type(2){
                margin-left: 8px;
            }

        }
        .common-warm-p{
            width: 70%;
            margin: -20px auto 0;
            font-size: 14px;
            color: #f25a29;
        }
    }
</style>

