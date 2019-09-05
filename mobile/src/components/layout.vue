<template>
    <div class="layout-div">
        <!-- 头部 -->
        <header class="layout-head">
            <span class="logo-span"></span>
            美职篮随聊
        </header>
        <slot name="content"></slot>
        <footer class="layout-footer">
            <van-tabbar 
                v-model="$store.state.currPage" 
                @change="changePage"
                active-color="#F9DC50"   
            >
                <van-tabbar-item
                    v-for="(item,index) in menu"
                    :key="index"
                >
                    <div class="my-mobile-icon">
                        <i :class="item.icon"></i>
                    </div>
                    {{item.title}}
                </van-tabbar-item>
            </van-tabbar>
        </footer>
    </div>
</template>
<script>
export default {
    name : 'layout',
    data(){
        return {
            menu:[
                {
                    icon:'myweb-icon-game',
                    title:'比赛',
                    path :'/game',
                    name : 'scheme'
                },
                {
                    icon:'myweb-icon-data',
                    title:'数据',
                    path:'/count',
                    name : 'count'
                },
                {
                    icon:'myweb-icon-team',
                    title:'球队',
                    path:'/team',
                    name : 'team'
                },
                {
                    icon:'myweb-icon-qy',
                    title:'球员',
                    path:'/player',
                    name : 'player'
                },
                {
                    icon:'myweb-icon-user',
                    title:'我的',
                    path:'/user',
                    name : 'user'
                }
            ]
        }
    },
    methods:{
        changePage(index){
           this.$store.dispatch('actChangePage',index)
           let _path = this.menu[index].name;
           this.$router.push({name : _path})
        }
    }
}
</script>
<style lang="scss" scoped>
    .layout-div{
        width: 100%;
        height: 100%;
        position: relative;
        padding: 40px 0 50px;
        background-color: #f5f5f5;
        box-sizing: border-box;
    }
    .layout-head{
        height: 40px;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: #f25a29;
        color: #fff;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        z-index: 100;
        .logo-span{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 30px;
            height: 30px;
            left: 30px;
            background: url('../assets/logo.png') no-repeat center center;
            background-size:100%; 
        }
    }
    .layout-footer{
        width: 100%;
        height: 50px;
        position: fixed;
        left: 0;
        bottom: 0;
        .van-tabbar{
            background-color: #f25a29;
        }
        .van-tabbar-item{
            color: #fff;
            position: relative;
            padding-top: 25px;
            background-color: #f25a29;
        }
        .my-mobile-icon{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 10px;
        }
    }
</style>


