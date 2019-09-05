<template>
    <div class="team-item-div">
        <div class="team-title-p"><img :src="handleTitile(title)">{{title}}排名</div>
        <div class="team-rank-des">
            <section class="title-sec pro-sec">球队</section>
            <section class="title-sec res-sec">战绩</section>
            <section class="title-sec res-sec">近况</section>
        </div>
        <section
            v-for="(item,index) in rankArr"
            :key="index"
            class="pm-common-sec"
        >
            <section class="item-inner-sec item-team-infor">
                <span 
                    class="item-rank-span"
                    :class="{'first-span':index == 0,'second-span':index==1,
                    'third-span':index == 2,'f-to-e':index > 2 && index < 8 ,'out-playoff':index > 7}"
                >{{index+1}}</span>
                <span class="item-logo-span">
                    <img :src="item.logoSrc" >
                </span>
                <p>{{item.tName}}</p>
            </section>
            <section class="item-inner-sec res-sec">{{item.wNum}}胜/{{item.fNum}}负</section>
            <section class="item-inner-sec res-sec">{{item.states}}</section>
        </section>
    </div>
</template>
<script>
import {handleLogo,loadImg} from '@/utils/getLogo.js';
export default {
    name : 'teamItem',
    props:['title','pmArr'],
    data(){
        return {
            rankArr : []
        }
    },
    created(){
        this.rankArr = this.$props.pmArr;
    },
    methods:{
        handleTitile(title){
            let src = title == '东部'?  '/images/eastern_logo.png' :  "/images/western_logo.png";
            return src 
        },
        // 处理头像
        handleTx(qd,index){
            let _team = handleLogo(qd);
            loadImg(_team).then(()=>{
                this.rankArr[index].isLoad = true;
            }).catch(err =>console.log(err))
            return _team;
        }
    },
    watch:{
        pmArr(newV,oldV){
            this.rankArr = newV;
        }
    }
}
</script>
<style lang="scss" scoped>
    p{
        margin: 0;
    }
    .team-item-div{
        background-color: #fff;
        border-radius: 5px;
        position: relative;
        margin-bottom: 15px;
        box-shadow: 0 0 2px rgba(0,0,0,.1);
    }
    .team-title-p{
        font-size: 16px;
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-weight: bold;
        border-bottom: 0.5px solid #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            display:block;
            width: 30px;
            height: 30px;
            margin-right: 8px;
        }
    }
    .team-rank-des{
        height: 30px;
        line-height: 30px;
        display: flex;
        border-bottom: 0.5px solid #ddd;
        .title-sec{
            height: 100%;
            font-size: 16px;
            font-weight: bold;
            box-sizing: border-box;
        } 
    }
    .pro-sec{   
        width: 50%;
        padding-left: 20px;
    }
    .res-sec{
        width: 25%;
        text-align: center;
    }
    .pm-common-sec{
        display: flex;
        height: 40px;
        position: relative;
        box-sizing: border-box;
        &:nth-of-type(2n){
            background-color: #f6f6f6;
        }
        .item-inner-sec{
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            height: 100%;
            position: relative;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            &:not(:first-of-type){
                justify-content: center;
            }
            
        }
        .item-team-infor{
            width: 50%;
            padding-left: 50px;
        }
        .item-rank-span{
            position: absolute;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            top: 50%;
            margin-top: -15px;
            left: 10px;
            line-height: 30px;
            text-align: center;
            font-size: 16px;
            box-sizing: border-box;
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
        .f-to-e{
            color: #d0a64e;
        }
        .out-playoff{
            color: #555;
        }
        .item-logo-span{
            display: inline-block;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            overflow: hidden;
            box-sizing: border-box;
            margin-right: 5px;
            img{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
    }
</style>


