<template>
    <div class="qysj-item-div">
        <div class="qysj-title-div">
            <section class="item-left-sec">{{title}}榜</section>
            <section class="item-right-sec">球队</section>
            <section class="item-right-sec">数据</section>
        </div>
        <van-list 
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="loadData"
        >
            <div class="dxsj-item-div"
                v-for="(item,index) in sjArr"
                :key="index"
            >
                <section class="item-left-sec">
                    <span class="dxmc-span" :class="{'first-span':index == 0,'second-span':index == 1,'third-span':index == 2}">{{index+1}}</span>
                    <span class="img-cover-span">
                        <van-image
                            :lazy-load='true'
                            :src="item.imgSrc"
                        />
                    </span>
                    <p class="dxsj-player-p" @click="toPlayer(item)">{{item.player}}</p>
                </section>
                <section class="item-right-sec dxsj-team-sec">{{getTeamName(item.tid)}}</section>
                <section class="item-right-sec">{{item.sjlx}}</section>
            </div>
        </van-list>
        
    </div>
</template>
<script>
import {getSingleData} from '@/api/myapi.js';
export default {
    name : 'qysjItem',
    props:['dxsj'],
    data(){
        return {
            title : '',
            lx : '',
            sjArr :[],
            loading : false,
            finished : false,
            number : 15,
            canLoad : true,
        }
    },
    created(){
        this.title = this.$props.dxsj.title;
        this.sjArr = this.$props.dxsj.sj;
        this.lx = this.handleData(this.title);
    },
    inject:['getTeamName'],
    methods:{
        handleData(item){
            let _item = null;
            switch(item){
                case "得分":
                    _item = 'points';
                    break;
                case "篮板":
                    _item = 'reb';
                    break;                
                case "助攻":
                    _item = 'assist';
                    break;                
                case "抢断":
                    _item = 'steal';
                    break;
                case "盖帽":
                    _item = 'block';
                    break;
            }
            return _item;
        },
        // 异步加载数据
        loadData(){
            let _num = this.number;
            let _this = this;
            let cs = {
                itemArr : [this.lx],
                number : 15,
                start : _num
            }
            getSingleData(cs).then(data=>{
                _num += 15;
                this.number = _num
                this.loading = false;
                this.sjArr.push(...data.data.result);
                if(data.data.result.length < 15){
                    this.finished = true;
                }
            }).catch(err =>{console.log(err);})
        },
        toPlayer(item){
            this.$router.push({
                name:'playerInfor',
                query:{
                    xx : {
                        player : item.player,
                        pid : item.pid
                    }
                }
            })
        }
    },
    watch:{
        dxsj(newV,oldv){
            this.title = newV.title;
            this.sjArr = newV.sj;
        }
    }
}
</script>
<style lang="scss">
    .qysj-item-div{
        padding-top: 10px;
        position: relative;
        p{
            margin: 0;
            padding: 0;
        }
        div{
            position: relative; 
        }
        .van-cell{
            padding: 0;
            background-color: transparent;
            border-bottom: 1px solid #ddd;
        }
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
    .item-left-sec{
        width: 70%;
        height: 100%;
        padding-left: 10px;
    }
    .item-right-sec{
        width: 15%;
        height: 100%;
        text-align: center;
    }
    .dxsj-item-div{
        height: 40px;
        box-sizing: border-box;
        position: relative;
        display: flex;
        &:not(:last-of-type){
            border-bottom: 1px solid #ddd;
        }
        section{
            box-sizing: border-box;
            position: relative;
            line-height: 40px;
            &:not(:first-of-type){
                text-align: center;
            }
            &:nth-of-type(3){
                font-size: 14px
            }
        }
        .item-left-sec{
            padding-left: 45px;
            display: flex;
            align-items: center;
        }
        .first-span{
            color: #f25a29;
            font-weight: bold;
        }
        .second-span{
            color: #f9744a;
            font-weight: bold;
        }
        .third-span{
            color: #ea8a6c;
            font-weight: bold;
        }
        .dxmc-span{
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            left: 10px;
            font-size: 16px;
        }
        .dxsj-player-p{
            white-space: nowrap;
            font-size: 12px;
        }
        .dxsj-team-sec{
            font-size: 12px;
            white-space: nowrap;
        }
        .img-cover-span{
            display: inline-block;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            position: relative;
            margin-right: 5px;
            overflow: hidden;
            img{
                display: block;
                width: 57px;
                margin:3px 0 0 -10px; 
            }
        }
    }

</style>
