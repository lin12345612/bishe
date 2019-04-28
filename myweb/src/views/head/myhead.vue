<template>
    <div id="myHead" class="my-head">
        <img src="../../assets/logo.png"class="my-logo">
        <div class="about-us-div">关于我们<span class="my-code-span"></span></div>
    </div>
</template>
<script>
export default {
    name : 'myhead'
}
</script>
<style lang="scss">
    .my-head{
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .my-logo{
        height: 50px;
        margin-left: 40px;
    }
    .about-us-div{
        color: #fff;
        position: relative;
        font-size: 20px;
        cursor: pointer;
        margin-right: 30px;
        &:hover .my-code-span{
            height: 70px;
        }
    }
    .my-code-span{
        display: block;
        width: 70px;
        height: 0px;
        background: url('../../assets/code.jpg') no-repeat center center;
        position: absolute;
        top: 33px;
        left: 8px;
        overflow: hidden;
        transition: height linear .5s;
    }
</style>