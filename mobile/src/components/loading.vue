<template>
    <div class="myloading-div" v-show="xs">
        <van-loading color="#f25a29" type="spinner"/>
    </div>
</template>
<script>
export default {
    name : 'loading',
    props:['xs']
}
</script>

<style lang="scss" scoped>
    .myloading-div{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,.3);
        z-index: 99;
        .van-loading{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
    }
</style>

