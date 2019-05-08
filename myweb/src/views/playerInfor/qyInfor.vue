<template>
    <div class="qyxx-div">
        <div class="back-div" @click="bacKChose" title="返回选择球员"><i class="myweb-icon-back"></i></div>
        <!-- 头像以及基本信息部分 -->
        <div class="qy-base-div">
            <div class="qy-img-div">
                <img :src="txSrc" v-if="txShow" class="qyxx-img">
            </div>
            <div class="qy-xx-div">
                <p>姓名：{{$store.state.qyxx.xm}}</p>
                <p>身高：{{xxArr.height}}米</p>
                <p>体重：{{xxArr.weight}}公斤</p>
                <a class="pic-a" target="_blank" :href="xxArr.picLink" v-if="xxArr.picLink != null">球员更多图片</a>
            </div>
            <div class="qy-xx-div qy-last-div">
                <div v-if="xxArr.contract != null">
                    <p>球队：{{$store.state.qyxx.qd}}</p>
                    <p>合同：{{xxArr.contract}}</p>
                </div>
                <p class="retire-p" v-if="xxArr.contract == null">已退役</p>
                <p>号码：{{xxArr.number}}</p>
                <p>选秀：{{xxArr.rookie}}</p>
                
            </div>
        </div>
        <!-- 球员荣誉 -->
        <div class="honor-div" v-if="ryShow">
            <p class="honor-title-p">个人荣誉</p>
            <div class="sec-cover-div">
                <section
                    v-for="(item,index) in ryArr"
                    :key="index"
                    class="honor-sec"
                >{{item.honor}}</section>
            </div>
        </div>
        <!-- 生涯数据 -->
        <div class="career-data-div">
            <p class="honor-title-p">生涯数据</p>
            <template>
                <el-table 
                    :data="syArr"
                    style="100%"
                    header-row-class-name="career-title-tr"
                    row-class-name="career-common-tr"
                    >
                    <el-table-column
                        prop="season"
                        label="赛季"
                        width="120"
                    ></el-table-column>
                    <el-table-column
                        prop="preteam"
                        label="球队"
                        width="180"
                    ></el-table-column>
                    <el-table-column
                        prop="cpoint"
                        label="得分"
                        width="70"
                    ></el-table-column> 
                    <el-table-column
                        prop="creb"
                        label="篮板"
                        width="70"
                    ></el-table-column> 
                    <el-table-column
                        prop="cassist"
                        label="助攻"
                        width="70"
                    ></el-table-column> 
                    <el-table-column
                        prop="csteal"
                        label="抢断"
                        width="60"
                    ></el-table-column>  
                    <el-table-column
                        prop="cblock"
                        label="盖帽"
                        width="60"
                    ></el-table-column> 
                    <el-table-column
                        prop="avedata"
                        label="场均数据"
                        width="320"
                    ></el-table-column>   
                </el-table>
            </template>
        </div>
    </div>
</template>
<script>
import {myload,imgLoad} from '@/utils/loading.js';
import {getPlayerInfor} from '@/api/myApi.js'
export default {
    name : 'player-infor',
    data(){
        return {
            xxArr : [],
            syArr : [],
            ryArr : [],
            ljtz  : '',
            txSrc : '',
            txShow :false,
            ryShow : false
        }
    },
    mounted(){
        this.getQyXx()
    },
    methods:{
        getQyXx(){
            var xx = {
                name : this.$store.state.qyxx.xm,
                team : this.$store.state.qyxx.qd
            };
            var load = myload();
            getPlayerInfor(xx).then(data=>{
                this.xxArr = data.data.info[0][0];
                this.ljtz = this.xxArr.picLink;
                this.syArr = data.data.info[1];
                this.ryArr = data.data.info[2];
                if(this.ryArr.length > 0){
                    this.ryShow = true
                }
                this.txSrc = this.xxArr.imgSrc;
                imgLoad(this.txSrc).then(()=>{
                    this.txShow = true
                })
                load.close();
            }).catch(err=>{console.log(err);})
            load.close();
        },
        bacKChose(){
            this.$store.dispatch('actChangePf',true)
        }
    }
}
</script>
<style lang="scss">
    .qyxx-div{
        padding-top: 30px;
    }
    .back-div{
        position: absolute;
        top:0px;
        left: 0px;
        width: 50px;
        text-align: center;
        border: none;
        height: 50px;
        line-height: 50px;
        border-radius: 5px;
        cursor: pointer;
        // color: #fff;
        // background: #fff;
        .myweb-icon-back{
            font-size: 25px;
            color: #f25a29;
        }
    }
    .qy-base-div{
        display: flex;
        padding-left: 60px;
    }
    .qy-img-div{
        width: 200px;
        min-height:160px;
        background-color: #fff;
    }
    .qy-xx-div{
        width: 220px;
        min-height: 160px;
        margin-left: 30px;
        p{
            font-size: 18px;
            margin-bottom: 10px;
            line-height: 1.5;
        }
        .retire-p{
            color: #f25a29;
        }
    }
    .qy-last-div{
        width: 350px;
    }
    .qyxx-img{
        display: block;
        width: 200px;
        margin: 0 auto;
    }
    .honor-div{
        margin-top: 20px;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 3px;
        background: #fff;
    }
    .honor-title-p{
        font-size: 24px;
        text-align: center;
        font-weight: 600;
        line-height: 30px;
        height: 30px;
        margin-bottom: 20px;
    }
    .sec-cover-div{
        display: flex;
        flex-wrap: wrap;
    }
    .honor-sec{
        width: 50%;
        padding: 0 5px;
        margin: 0 0 14px 0;
    }
    .career-data-div{
        border: 1px solid #ddd;
        padding: 12px;
        border-radius: 3px;
        margin-top: 30px;
    }
    .career-title-tr th{
        text-align: center;
    }
    .career-common-tr td{
        text-align: center;
    }
    .pic-a{
        animation: setColor 1s linear infinite;
        font-size: 18px;
        line-height: 1.5;
    }
    @keyframes setColor {
        0%{
            color: #f25a29;
        }
        100%{
            color: #528434;
        }
    }
</style>


