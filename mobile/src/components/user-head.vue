<template>
    <div class="user-head">
        <i class="myweb-icon-fh tbwz" @click="backToPrev"></i>
        {{title}}
        <slot name="opera"></slot>
    </div>
</template>
<script>
export default {
    name : 'user-head',
    props:['title'],
    methods:{
        backToPrev(){
            this.$emit('backBtn')
            // this.$router.go(-1);
        }
    }
}
</script>
<style lang="scss" scoped>
    .user-head{
        box-sizing: border-box;
        width: 100%;
        height: 40px;
        background-color: #f25a29;
        position: fixed;
        top: 0;
        left: 0;
        line-height: 40px;
        text-align: center;
        color: #fff;
        font-size: 16px;
        z-index:100;
        .tbwz{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 15px;
            color: #fff;
            font-size: 22px;
        }
        .head-slot{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 20px;
        }
    }
</style>


