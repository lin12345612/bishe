<template>
    <div class="more-div">
        <common-head :title="title">
        </common-head>
        <textarea class="get-opinion" placeholder="请留下您宝贵的意见" v-model="opin"></textarea>
        <div class="more-btn-cover-div">
            <button class="send-btn" @click="sendOpinion">发送</button>
        </div>
        <button class="login-out-btn" v-if="$store.state.isLogin" @click="loginout">退出登录</button>
    </div>
</template>
<script>
import commonHead from '@/components/head'
import {recordMessage} from '@/api/myapi'
export default {
    name : 'more',
    components:{commonHead},
    data(){
        return {
            title:'更多',
            opin :''
        }
    },
    methods:{
        sendOpinion(){
            if(this.opin){
                recordMessage(this.opin).then(res=>{
                    if(res.data.success){
                        this.$toast({
                            message : '感谢您的留言，我们会加油的！',
                            type :'success'
                        })
                        this.opin = '';
                    }
                }).catch(err=>{console.log(err);})
            }else{
                this.$toast('请输入您的意见')
            }
        },
        loginout(){
            this.$store.dispatch('actChangeLogin',false)
            this.$store.commit('changeTx','');
            this.$store.commit('changeUser','');
            this.$store.commit('changeNc','')
            this.$store.commit('changeXs','点击登录');
            this.$store.commit('changeRoute','')
        }
    }
}
</script>

<style lang="scss">
    .more-div{
        width: 100%;
        height: 100%;
        position: relative;
        padding-top: 60px;
        background-color: #f5f5f5;
        box-sizing: border-box;
        .get-opinion{
            display: block;
            width: 90%;
            height: 200px;
            border:none;
            background-color: #fff;
            border-radius: 3px;
            margin:  0 auto 20px;
            resize: none;
            padding:5px;
            box-sizing: border-box;
        }
        .more-btn-cover-div{
            width: 90%;
            margin: 0 auto;
            height: 30px;
            box-sizing: border-box;
            display: flex;
            justify-content: flex-end;
            .send-btn{
                width: 80px;
                height: 30px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                background-color: #f25a29;
                color: #fff;
            }
        }
        .login-out-btn{
            width: 100%;
            height: 45px;
            background-color: #fff;
            border: none;
            box-sizing: border-box;
            position: fixed;
            left: 0;
            bottom: 20px;
            cursor: pointer;
        }
    }
</style>
