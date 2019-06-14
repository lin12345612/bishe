<template>
    <div class="data-rank-div">
        <van-tree-select
            :items="items"
            :main-active-index="mainActiveIndex"
            @navclick="onNavClick"
            class="my-tree-select"
        />
        <div class="right-con-div">
            <qysj-item
                v-for="(item,index) in sjArr"
                :key="index"
                :dxsj="item"
                v-show="mainActiveIndex == index"
            ></qysj-item>
        </div>
    </div>
</template>
<script>
import QysjItem from './component/qysj-item.vue';
export default {
    name : 'dataRank',
    components:{QysjItem},
    data(){
        return {
            items:[
                {
                    text:'得分'
                },
                {
                    text : '篮板'
                },
                {
                    text : '助攻'
                },
                {
                    text : '抢断'
                },
                {
                    text : '盖帽'
                }
            ],
            mainActiveIndex:0,
            sjArr : [
                {
                    title:'得分',
                    sj : []
                },
                {
                    title:'篮板',
                    sj : []
                },
                {
                    title:'助攻',
                    sj : []
                },
                {
                    title:'抢断',
                    sj : []
                },
                {
                    title:'盖帽',
                    sj : []
                }
            ]
        }
    },
    methods:{
        onNavClick(index){
            this.mainActiveIndex = index;
        }
    }
}
</script>
<style lang="scss" scoped>
    .data-rank-div{
        padding-top: 5px;
        position: relative;
        .my-tree-select{
            position: absolute;
            top: 5px;
            left: 0;
        }
        .van-tree-select{
            width: 80px;
            height: 232.5px!important;
            padding: 10px 0;
            overflow: hidden;
            z-index: 65;
        }
        .van-tree-select__nav{
            padding: 18px 0;
        }
        .van-tree-select__nitem{
            height: 43.5px;
        }
        .van-tree-select__nitem--active{
            background-color: #f5f5f5;
        }
    }
    .right-con-div{
        position: absolute;
        top: 5px;
        left: 0;
        width: 100%;
        min-height: 300px;
        z-index: 64;
        padding-left: 80px;
    }
</style>

