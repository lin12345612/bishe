<template>
    <div class="login-div">
        <div class="outer-div">
            <el-input v-model="user" placeholder="请输入账号" ></el-input>
        </div>
        <div class="outer-div">
            <el-input v-model="psw" placeholder="请输入密码" type="password"></el-input>
        </div>
        <p v-if="isfalse" class="outer-div">账号或密码错误</p>
        <div class="outer-div">
            <el-button type="primary" @click="login">查询</el-button>
        </div>
    </div>
</template>
<script>
import {login} from '@/api/api.js'
export default {
    name : 'login',
    data(){
        return{
            user : '',
            psw  : '',
            isfalse :false
        }
    },
    methods:{
        login(){
            login(this.user,this.psw).then(res=>{
                // console.log(res.data);
                if(res.data.success){
                    this.isfalse = false;
                    this.$router.push({
                        path : 'player'
                    })
                }
                else{
                    this.isfalse = true;
                }
            }).catch(err=>{console.log(err);})
        }
    }
}
</script>
<style lang="scss">
    .login-div{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #f5f5f5;
    }
    .outer-div{
        width: 30%;
        margin:  30px auto;
    }
</style>