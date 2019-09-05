<template>
    <div class="logined-outer-div">
        <div class="head-fill-div">
            <img :src="bgsrc" class="bg-img">
            <span class="img-span">
                <img :src="$store.state.tx" v-if="$store.state.tx">
            </span>
            <p class="user-p" @click="ptoLogin">{{$store.state.yhText}}</p>
        </div>
        <van-cell title="编辑资料" is-link  @click="toData"/>
        <van-cell title="我的主队" is-link @click="toMyTeam"/>
        <van-cell title="喜欢的球员" is-link @click="toPlayer"/>
        <van-cell title="更多" is-link @click="toMore"/>
        <van-cell title="关于我们" is-link @click="aboutus"/>
    </div>
</template>
<script>
export default {
    name : 'personal',
    data(){
        return {
            bgsrc : '/images/bg.jpg',
        }
    },
    methods:{
        toData(){
            if(this.$store.state.isLogin){
                this.$router.push({name : 'personal'})
            }else{
                this.$store.commit('changeRoute','personal')
                this.$store.commit('changeParams','')
                this.$emit('toLogin');
            }
        },
        toMyTeam(){
            if(this.$store.state.isLogin){
                this.$router.push({name : 'myteam'})
            }else{
                this.$store.commit('changeRoute','myteam')
                this.$store.commit('changeParams','')
                this.$emit('toLogin');
            }
        },
        toPlayer(){
            if(this.$store.state.isLogin){
                this.$router.push({name : 'myplayer'})
            }else{
                this.$store.commit('changeRoute','myplayer')
                this.$store.commit('changeParams','')
                this.$emit('toLogin');
            }
        },
        toMore(){
            this.$router.push({name : 'more'})
        },
        aboutus(){
            this.$router.push({name : 'aboutus'})
        },
        ptoLogin(){
            if(!this.$store.state.isLogin){
                this.$emit('toLogin');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .logined-outer-div{
        width: 100%;
        height: 100%;
        position: relative;
        .head-fill-div{
            height: 200px;
            position: relative;
        }
        .bg-img{
            display: block;
            width: 100%;
            height: 100%;
            opacity: .6;
        }
        .img-span{
            display: block;
            width: 96px;
            height: 96px;
            border-radius: 50%;
            background-color: #f5f5f5;
            opacity: .8;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 10px;
            overflow: hidden;
            img{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .user-p{
            text-align: center;
            font-size: 16px;
            white-space: nowrap;
            position: absolute;
            top:95px;
            left: 50%;
            transform: translateX(-50%);
            color: #fff;
        }
    }
</style>
