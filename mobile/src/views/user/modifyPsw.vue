<template>
    <div class="modifypsw-div">
        <common-head :title="title">
            <p slot="opera" class="save-p" :class="{'clickable': (op && np && np1 )}"  @click="handleClick">确定</p>
        </common-head>
        <input type="password"  v-model="op" class="psw-cpmmon-input" placeholder="请输入原密码">
        <input type="password"  v-model="np" class="psw-cpmmon-input" placeholder="请输入新的密码">
        <input type="password"  v-model="np1" class="psw-cpmmon-input" placeholder="请再次输入密码">
    </div>
</template>
<script>
import commonHead from '@/components/head'
import {modifyPsw} from '@/api/myapi'
export default {
    name : 'modifyPsw',
    components:{commonHead},
    data(){
        return {
            title:'修改密码',
            op :'',
            np :'',
            np1:'',
            ableClick : false
        }
    },
    methods:{
        handleClick(){
            if(!this.op){
                this.$toast({
                    duration : 1000,
                    message : '请输入原密码'
                })
            }else if(!this.np){
                this.$toast({
                    duration : 1000,
                    message : '请输入新的密码'
                })
            }else if(!this.np1){
                this.$toast({
                    duration : 1000,
                    message : '请再次输入新的密码'
                })
            }else if(this.np != this.np1){
                this.$toast({
                    duration : 1000,
                    message : '两次输入的密码不一致，请重新输入'
                })
            }else{
                modifyPsw(this.$store.state.user,this.op,this.np).then(res=>{
                    if(res.data.success){
                        this.$toast({
                            duration : 1000,
                            message : '修改密码成功，请重新登录'
                        })
                        setTimeout(()=>{
                            this.$store.dispatch('actChangeLogin',false)
                            this.$store.commit('changeTx','');
                            this.$store.commit('changeUser','');
                            this.$store.commit('changeNc','')
                            this.$router.push({name:'user'})
                        },1000)
                    }else{
                        this.$toast({
                            duration : 1000,
                            message : '原密码出错，请重新输入'
                        })
                    }
                }).catch(err=>{console.log(err);})
            }
        }
    }
}
</script>

<style lang="scss">
    .modifypsw-div{
        width: 100%;
        height: 100%;
        position: relative;
        padding-top: 60px;
        background-color: #f5f5f5;
        box-sizing: border-box;
        .psw-cpmmon-input{
            width: 100%;
            height: 40px;
            background-color: #fff;
            box-sizing: border-box;
            border: none;
            padding-left: 10px;
            margin-bottom: 10px;
        }
        .save-p{
            @include set-pt;
            right: 20px;
            opacity: .3;
            margin: 0;
            cursor: pointer;
        }
        .clickable{
            opacity: .8;
        }
    }
</style>
