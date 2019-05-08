<!-- 鼠标移入登陆是显示的页面 -->
<template>
    <div class="login-warm-div">
        <span class="tri-zs-span"></span>
        <p class="notice-login-p" v-if="$store.state.lg">登陆可定制个人喜好球队以及球星</p>
        <p class="notice-login-p" v-if="!$store.state.lg" @click="loginOut">退出登录</p>
    </div>
</template>
<script>
export default {
    name : 'login-opera',
    methods:{
        loginOut(){
            this.$store.dispatch('actChangeLg',true);
            this.$store.dispatch('acytChangeUser','登录')
        }
    }
}
</script>
<style lang="scss">
    .login-warm-div{
        padding: 10px;
        border-radius: 3px;
        background: #fff;
    }
    .tri-zs-span{
        display: block;
        border-style: dashed dashed solid dashed;
        border-color: transparent transparent #fff transparent;
        border-width: 8px;
        position: absolute;
        top:-16px;
        left: 50%;
        transform: translateX(-50%);
    }
    .notice-login-p{
        color: #333;
        white-space: nowrap;
        font-size: 14px;
    }
</style>

