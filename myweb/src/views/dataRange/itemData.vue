<template>
    <div class="item-div">
        <div class="item-outer-div">
            <p class="item-title-p">{{title}}</p>
            <div class="item-table-div">
                <table class="item-table">
                    <tr class="title-tr">
                        <td style="width:70px">排名</td>
                        <td style="width:220px">球员</td>
                        <td style="width:80px">球队</td>
                        <td style="width:70px">数据</td>
                    </tr>
                    <tr
                        v-for="(item,index) in dataArr"
                        :key="index"
                        class="common-tr"
                    >
                        <td class="ranks-td"><i :class="lmArr[index]"></i></td>
                        <td>
                            <div class="td-cover-div">
                                <div class="img-div">
                                    <img :src="item.imgSrc" class="dr-img" v-if="flagArr[index]">
                                </div>
                                <p class="name-p">{{item.player}}</p>
                            </div>
                        </td>
                        <td>{{item.tName}}</td>
                        <td>{{item[sx]}}</td>
                    </tr>
                </table>
            </div>
            <button class="more-btn" @click="showPop">查看更多</button>
        </div>
    </div>
</template>
<script>
import {imgLoad} from '@/utils/loading.js';
export default {
    name : 'item-data',
    data(){
        return {
            lmArr : [
                'myweb-icon-first number-one',
                'myweb-icon-second number-two',
                'myweb-icon-third number-three',
                'myweb-icon-fourth number-other',
                'myweb-icon-fifth number-other',
                'myweb-icon-sixth number-other',
                'myweb-icon-seventh number-other',
                'myweb-icon-eighth number-other',
                'myweb-icon-ninth number-other',
                'myweb-icon-tenth number-other'
            ],
            dataArr:[],
            flagArr :[
                {flag:false},
                {flag:false},
                {flag:false},
                {flag:false},
                {flag:false},
                {flag:false},
                {flag:false},
                {flag:false},
                {flag:false},
                {flag:false},
                {flag:false}
            ],
            // sp : false
        }
    },
    created(){
        this.dataArr = this.$props.sjData;
        var _arr = this.dataArr;
        for(let i = 0; i < 10; i++){
            imgLoad(_arr[i].imgSrc).then(()=>{
                this.flagArr[i].flag = true;
            })
            .catch((err)=>{console.log(err);})
        }
    },
    methods:{
        showPop(){
            this.$store.dispatch('actChangeDf',true)
            this.$store.dispatch('actSetProject',this.$props.title)
        }
    },
    props:['title','sjData','sx']
}
</script>
<style lang="scss" scoped>
    .item-outer-div{
        padding: 10px 10px 50px;
        border: 1px solid #ddd;
        width:100%;
        position: relative;
        .item-table{
            width: 100%;
            table-layout: fixed;
            border-collapse: collapse;
            tr{
                border-bottom: 1px solid #EBEEF5;
            }
            border: none;
            .title-tr{
                height: 44px;
                background: #fafafa;
                td{
                    text-align: center;
                    font-size: 18px;
                }
            }
            .common-tr{
                height: 60px;
                background: #fff;
                td:not(:nth-of-type(2)){
                    text-align: center;
                }
            }
        }
        .ranks-td{
            i{
                font-size: 30px;
            }
        }
        .td-cover-div{
            width: 100%;
            height: 100%;
            position: relative;
            display: flex;
            // justify-content: center;
            align-items: center;
            padding-left: 20px;
            cursor: pointer;
            &:hover{
                .name-p{
                    text-decoration: underline;
                }
            }
            .img-div{
                width: 55px;
                height: 55px;
                border-radius: 50%;
                overflow: hidden;
                border: 1px solid #ddd;
                margin-right: 10px;
            }
            .name-p{
                font-size: 16px;
            }
        }
    }
    .item-title-p{
        text-align: center;
        font-size: 25px;
        margin-bottom: 20px;
        color: #666;
        i{
            font-size: 25px;
        }
    }
    .item-table-div{
        padding-right: 10px;
        position: relative;
    }
    .number-one{
        color:#c72222;
        font-size: 20px;
    }
    .number-two{
        color:#ab4e22;
        font-size: 20px;
    }
    .number-three{
        color: #c39d48;
        font-size: 20px;
    }
    .number-other{
        color: #aeb53d;
        font-size: 20px;
    }
    .dr-img{
        display: block;
        width: 90px;
        margin-left: -18px;
        // height: 100%;
    }
    .more-btn{
        width: 300px;
        height: 30px;
        border-radius: 15px;
        background: #f0f0f0;
        position: absolute;
        bottom: 10px;
        left:50%;
        transform: translateX(-50%);
        border: none;
        cursor: pointer;
    }
</style>

