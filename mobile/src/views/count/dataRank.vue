<template>
    <div class="data-rank-div" ref="sjnrq">
        <van-tree-select
            :items="items"
            :main-active-index="mainActiveIndex"
            @navclick="onNavClick"
            class="my-tree-select"
            :class="{'fixed-in-top':setTop}"
        />
        <div class="right-con-div" v-if="isLoad" >
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
import QysjItem from './components/qysj-item.vue';
import {getSingleData} from '@/api/myapi.js'
export default {
    name : 'dataRank',
    components:{QysjItem},
    props:['setTop'],
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
                    title : '得分',
                    sj : []
                },
                {
                    title : '篮板',
                    sj : []
                },
                {
                    title : '助攻',
                    sj : []
                },
                {
                    title : '抢断',
                    sj : []
                },
                {
                    title : '盖帽',
                    sj : []
                }
            ],
            isLoad : false
        }
    },
    mounted(){
        let _this = this;
        this.$refs.sjnrq.addEventListener('touchmove',()=>{
            _this.$emit('setPosi')
        }) 
    },
    created(){
        this.initData()
    },
    methods:{
        initData(){
            let arr = ['points','reb','assist','steal','block']
            let data = {
                itemArr : arr,
                number  : 15,
                start   : 0
            }
            getSingleData(data).then(req =>{
                this.isLoad = true;
                for(let i = 0; i<5; i++){
                    this.sjArr[i].sj = req.data.result[i]
                }
            }).catch(err=>{console.log(err);})
        },
        onNavClick(index){
            this.mainActiveIndex = index;
        }
    }
}
</script>
<style lang="scss" scoped>
    .data-rank-div{
        padding-top: 15px;
        position: relative;
        .my-tree-select{
            position: absolute;
            top: 20px;
            left: 0;
            width: 80px;
            height: 270px !important;
            overflow: hidden;
            z-index: 99;
        }
        .fixed-in-top{
            position: fixed;
            top: 40px ;
        }
        .van-tree-select__content{
            background: #f0f0f0;
            display: none;
        }
        .van-tree-select__nav{
            padding: 23px 0;
            background-color: #fff;
        }
        .van-tree-select__nitem{
            height: 43.5px;
        }
        .van-tree-select__nav-item--active{
            background-color: #f0f0f0;
        }
    }
    .right-con-div{
        box-sizing: border-box;
        position: absolute;
        top: 5px;
        left: 0;
        // bottom: 0;
        width: 100%;
        min-height: 400px;
        z-index: 64;
        padding-left: 80px;
        background-color: #f0f0f0;
        .qysj-item-div{
            padding-top: 10px;
            position: relative;
        }
        .qysj-title-div{
            display: flex;
            height: 30px;
            line-height: 30px;
            section{
                border-bottom: 1px solid #ddd;
                font-weight: bold;
                font-size: 14px;
                box-sizing: border-box;
                &:nth-of-type(1){
                    font-size: 16px;
                }
            }
        }
    }
</style>

