<template>
    <div  class="xz-input" :class="{'setMiddle':xzdone}">
        <div class="input-outer">
            <el-input
                placeholder="请输入球员姓名"
                v-model="qy"
                clearable
            >
            <el-button slot="append" icon="el-icon-search" @click="serachName"></el-button>
            </el-input>
        </div>
        <div class="name-list" v-show="!xzdone">
            <p class="warm-p" v-show="warming">很抱歉，没有找到与“{{nr}}”相关的球员，请重新输入</p>
            <section
                v-for="(item,index) in nameArr"
                :key="index"
                class="list-section"
                @click="showPlayer(index)"
            >{{item.player}}</section>
        </div>
    </div>
</template>
<script>
import {myload,myMessage} from '@/utils/loading.js';
import {searchName} from '@/api/myApi.js';
export default {
    name : 'search-player',
    data(){
        return {
            qy : '',
            xzdone:true,
            nameArr : [],
            warming : false,
            nr : ''
        }
    },
    methods:{
        serachName(){
            if(this.qy){
                var load = myload();
                this.warming = false
                this.nr = this.qy;
                searchName(this.qy).then((data)=>{
                    var _arr = data.data.info
                    if(_arr.length > 0){
                       this.nameArr = data.data.info 
                    }else{
                        this.warming = true
                    }
                    this.xzdone = false;
                    load.close();
                }).catch(err=>{console.log(err);})
            }else{
                myMessage('请输入球员名称')
            }
        },
        showPlayer(index){
            var _arr = this.nameArr;
            var xx = {
                xm : _arr[index].player,
                qd : _arr[index].tName
            }
            this.$store.dispatch('actSetQyxx',xx)    //设置所点击球员信息
            this.$store.dispatch('actChangePf',false)  //隐藏选择部分的页面

        }
    }
}
</script>
<style lang="scss">
    .xz-input{
        min-height: 580px;
    }
    .input-outer{
        width: 60%;
    }
    .setMiddle{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .name-list{
        margin-top: 30px;
    }
    .list-section{
        padding: 0 15px;
        display: inline-block;
        height:32px;
        line-height: 32px;
        border-radius: 2px;
        margin:0 20px 20px 0;
        cursor: pointer;
        &:hover{
            background: #f25a29;
            color: #fff;
        }
    }
</style>


