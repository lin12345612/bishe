<template>
    <div class="about-us-div">
        <common-head :title="title">
        </common-head>
            <img src="/images/code.jpg" class="mycode">
        <p class="desc-p">我们是专注于分享NBA的一些相关情况，请关注我们吧。</p>
    </div>
</template>
<script>
import commonHead from '@/components/head'
export default {
    name : 'aboutus',
    components:{commonHead},
    data(){
        return {
            title:'关于我们'
        }
    }
}
</script>

<style lang="scss">
    .about-us-div{
        width: 100%;
        height: 100%;
        position: relative;
        padding-top: 80px;
        background-color: #f5f5f5;
        box-sizing: border-box;
        .about-code{
            display: block;
            margin: 0 auto 20px;
            width: 200px;
            height: 200px;
        }
        .mycode{
            display: block;
            // width: 200px;
            // height: 200px;
            margin: 0 auto;
        }
        .desc-p{
            box-sizing: border-box;
            padding: 0 10px;
            text-indent: 30px;
            font-size: 16px;
        }
    }
</style>
