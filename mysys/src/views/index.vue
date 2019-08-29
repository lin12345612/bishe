<template>
    <div class="index-cover-div">
        <div class="left-nav">
            <section 
                class="common-sec"
                v-for="(item,index) in navArr"
                :key="index"
                :class="{'curr-sec':index == currIndex}"
                @click="toOther(index)"
            >
                {{item.title}}
            </section>
        </div>
        <div class="top-div">{{titletxt}}</div>
        <div class="view-div">
            <keep-alive>
                <router-view />
            </keep-alive>
        </div>
    </div>
</template>
<script>
export default {
    name : 'index',
    data(){
        return {
            navArr : [
                {
                    title : '球员管理',
                    nav   : '/player'
                },
                {
                    title : '球队管理',
                    nav   : '/team'
                },
                {
                    title : '新闻管理',
                    nav   : '/news'
                },
                {
                    title : '赛程管理',
                    nav   : '/scheme'
                },
                {
                    title : '留言',
                    nav   : '/message'
                },
                {
                    title : '用户',
                    nav   : '/user'
                }
            ],
            currIndex : 0,
            titletxt : '球员管理'
        }
    },
    methods:{
        toOther(index){
            this.currIndex = index;
            this.titletxt = this.navArr[index].title;
            let _path = this.navArr[index].nav
            this.$router.push({
                path : _path
            })
        }
    }
}
</script>
<style lang="scss">
    .index-cover-div{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width:100%;
        height:100%;
        background-color:#f5f5f5;
        padding-left:100px;
        padding-top: 50px;
        .left-nav{
            width: 100px;
            position: absolute;
            padding-top: 60px;
            top: 0px;
            left: 0px;
            background-color: #fff;
            height: 100%;
            border-right: 1px solid #ddd;
        }
        .common-sec{
            width: 100%;
            height: 40px;
            line-height: 40px;
            text-align: center;
            cursor: pointer;
            &:hover{
                background: rgb(64, 158, 255);
                color: #fff;
            }
        }
        .curr-sec{
            background: rgb(64, 158, 255);
            color: #fff;
        }
        .view-div{
            width: 100%;
            height: 100%;
            position: relative;
        }
        .top-div{
            position: absolute;
            height: 50px;
            width: calc(100% - 100px);
            left: 100px;
            top: 0;
            background-color: #fff;
            line-height: 50px;
            padding-left: 60px;
            font-size: 18px;
        }
    }
</style>