<template>
    <div class="my-nav">
        <div class="nav-cover-div"></div>
        <div class="nav-cover">
            <el-menu 
                class="el-menu-demo" 
                mode="horizontal" 
                @select="handleSelect"  
                text-color = "#fff"
                active-text-color="#F9DC50"
                background-color="#e6582a"
                >
                <el-menu-item  
                    v-for="(item,index) in $store.state.menuArr" 
                    :index="index+''" 
                    :key="index" 
                    class="my-nav-item"
                    :class="setClass(index)"
                    >
                        <i :class="item.cn"></i>
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
            navArr : [],
        }
    },
    created() {
        this.navArr = this.$store.state.menuArr
    },
    methods: {
        // 菜单栏点击事件
        handleSelect(key,keypath){
            // console.log(key);
            this.$store.dispatch('actChangeMf',key);
            this.$router.push({name:this.navArr[key].path})
            if(key == 1){
                this.$store.dispatch('actChangeTf',true)
            }else if(key == 3){
                this.$store.dispatch('actChangePf',true)
            }
        },
        // 设置样式
        setClass(ind){
            if(this.$store.state.mf == ind ){
                return 'nav-active'
            }else{
                return 'nav-iactive'
            }
        }
    },
}
</script>
<style lang="scss" scope>
    .nav-active{
        color: rgb(249, 220, 80) !important;
        border-bottom-color: rgb(249, 220, 80)!important;
        i{
            color:rgb(249, 220, 80) !important;
        }
    }
    .nav-iactive{
        color: rgb(255, 255, 255) !important;
        border-bottom-color: transparent !important;
        i{
            color: rgb(255, 255, 255) !important;
        }
    }
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
    
    li.my-nav-item{
        font-size: 18px;
        i{
            color: #fff;
            font-size:18px;
            margin-right:5px;
        }
    }
</style>