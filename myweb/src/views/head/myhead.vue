<template>
    <div id="myHead" class="my-head">
        <img src="../../assets/logo.png" class="my-logo">
        <div class="about-us-div">
            <div class="login-div"><p  @click="lgOpera">{{$store.state.user}}</p>
                <login-opera class="my-login-div"></login-opera>
            </div>
            <p class="about-us-p">关于我们<span class="my-code-span"></span></p>
        </div>
    </div>
</template>
<script>
import LoginOpera from '../login/loginOpera';
export default {
    name : 'myhead',
    methods:{
        lgOpera(){
            this.$store.dispatch('actChangeDlFlag',true)
            // console.log(66);
            // console.log(this.$store.state.dlFlag);
            // this.$store.dispatch('actChangeLg',false);
            // this.$store.dispatch('acytChangeUser','欢迎您，小林')
            // 先判断用户是否已登录，若登陆则不弹出登陆窗口，否则弹出
            // if(!this.$store.state.login){
            //     this.$store.dispatch('actChangeDlFlag',true)
            // }
        }
    },
    components:{LoginOpera}
}
</script>
<style lang="scss">
    .my-head{
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .my-logo{
        height: 50px;
        margin-left: 40px;
    }
    .about-us-div{
        display: flex;
        // text-align: right;
        color: #fff;
        position: relative;
        font-size: 20px;
        cursor: pointer;
        margin-right: 30px;
        .about-us-p{
            margin-left: 15px;
            position: relative;
            &:hover .my-code-span{
                height: 70px;
            }
        }
    }
    .login-div{
        position: relative;
        .my-login-div{
            display: none;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 36px;
        }
        &:hover .my-login-div{
            display: block;
        }
    }
    
    .my-code-span{
        display: block;
        width: 70px;
        height: 0px;
        background: url('../../assets/code.jpg') no-repeat center center;
        position: absolute;
        top: 33px;
        left: 8px;
        overflow: hidden;
        transition: height linear .5s;
    }
</style>