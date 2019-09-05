<template>
    <div class="out-link-div">
        <common-head :title="title"></common-head>
        <iframe :src="lj" frameborder="0"></iframe>
    </div>
</template>
<script>
import CommonHead from './head';
export default {
    name:'outlink',
    components:{CommonHead},
    data(){
        return {
            lj : '',
            title:'其他'
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm =>{
            vm.lj = to.query.lj
        })
    }
}
</script>

<style lang="scss" scoped>
    .out-link-div{
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        padding-top: 40px;
        iframe{
            position: absolute;
            top: -85px;
            left: 0;
            width: 100%;
            height: calc(100% + 85px);
        }
    }
</style>
