<template>
    <div class="my-nav">
        <div class="nav-cover-div"></div>
        <div class="nav-cover">
            <el-menu 
                default-active='0'
                class="el-menu-demo" 
                mode="horizontal" 
                @select="handleSelect"
                text-color = "#fff"
                active-text-color="#F9DC50"
                background-color="#e6582a"
                >
                <el-menu-item v-for="(item,index) in navArr" :index="index+''" :key="index" class="my-nav-item">
                    {{item.val}}
                </el-menu-item>
            </el-menu>
        </div>
    </div>
</template>
<script>
export default {
    name : 'my-nav',
    data(){
        return {
            navArr : [
                {
                    val : '球队情况',
                    path : ''
                },
                {
                    val : '球员数据',
                    path : ''
                },
                {
                    val : '新闻专区',
                    path : ''

                },
                {
                    val : '赛程',
                    path : ''
                }
            ],
            // activeIndex:'0'
        }
    },
    methods: {
        handleSelect(key,keypath){
            console.log(key);
            console.log(keypath);
        }
    },
}
</script>
<style lang="scss" scope>
    .my-nav{
        height: 50px;
        position: relative;
        .el-menu>.el-menu-item{
        height: 49px;
        line-height: 49px;
    }
    }
    .nav-cover-div{
        height: 30px;
        width: 100%;
        background: #cc613e;
        position: absolute;
        top: 0;
        left: 0;
        border-top: 1px solid rgba(255, 255, 255, .5)
    }
    .nav-cover{
        width: 1020px;
        height: 50px;
        margin: 0 auto;
        background: #e6582a;
        position: relative;
        padding-left: 20px;
        &:before{
            display:block;
            position:absolute;
            content:'';
            border-style:solid solid dashed dashed;
            border-color:#af4f30 #af4f30 transparent transparent;
            border-width:10px 8px;
            bottom:0;
            left:-16px;
        }
        &:after{
            display:block;
            position:absolute;
            content:'';
            border-style:solid  dashed dashed solid;
            border-color: #af4f30 transparent transparent#af4f30;
            border-width:10px 8px;
            bottom:0;
            right:-16px;
        }
    }
    .line-top-i{
        display: block;
        width: 100%;
        height: 1px;
        position: absolute;
        top: -1px;
        left: 0;
        background: #e0aeae;
        z-index: 99;
    }
    
    .my-nav-item{
        font-size: 18px;
    }
</style>