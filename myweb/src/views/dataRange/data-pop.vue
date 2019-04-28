<template>
    <div class="data-pop">
        <el-dialog
            :close-on-click-modal="flag1"
            :visible="flag2"
            :before-close="handleClose"
            :title="pjTitle"
            width="450px"
            custom-class="pop-dialog"
        >
            <el-table
                :data="xmArr"
                style="width: 100%">
                <el-table-column
                    label="排名"
                    width="70">
                <template slot-scope="scope">
                    {{scope.$index+1+offset}}
                </template>    
                </el-table-column>
                <el-table-column
                    label="球员"
                    width="180">
                    <template slot-scope="scope">
                        <a href="javascript:;" class="pop-player-a">{{scope.row.player}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="tName"
                    label="球队"
                    width="80">
                </el-table-column>
                <el-table-column
                    :prop="xmtitle"
                    label="数据"
                    width="70">
                </el-table-column>
            </el-table>  
            <div class="btn-div">
                <button class="data-common-btn" @click="getFirst">首页</button>
                <button class="data-common-btn prex-btn" @click="getPrev">上一页</button>
                <button class="data-common-btn next-btn" @click="getNext">下一页</button>
                <div class="page-input-div">
                    <input type="text" class="page-input" v-model="pageNum">
                    <p class="jump-p" @click="getZd">跳转</p>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {myload,myMessage} from '@/utils/loading.js';
import {getSingleData} from '@/api/myApi.js';
export default {
    name : 'data-pop',
    data(){
        return {
            flag1 : false,
            flag2 : true,
            pjTitle:'',
            xmtitle:'',
            xmArr : [],
            offset : 0,
            pageNum:'',
            done : false   //用于判断数据是否为空
        }
    },
    created(){
        this.pjTitle = this.$store.state.project + '排行榜';
        switch(this.$store.state.project){
            case '得分':
                this.xmtitle = 'points';
                break;
            case '篮板':
                this.xmtitle = 'reb';
                break;
            case '助攻':
                this.xmtitle = 'assist';
                break;
            case '抢断':
                this.xmtitle = 'steal';
                break;
            case '盖帽':
                this.xmtitle = 'block';
                break;
        }
        this.originget(this.xmtitle,this.offset)
    },
    methods:{
        originget(xm,py){
            let load = myload();
            var dx = {
                item:xm,
                offset:py
            }
            getSingleData(dx)
            .then(data=>{
                var _arr = data.data.info;
                var _len = _arr.length;
                if(_len < 10){
                    this.done = true
                    if(_len == 0){
                        myMessage('您输入的页数超过范围，请重新输入')
                        this.pageNum = ''
                    }else{
                        this.xmArr = _arr;
                        this.offset = py;
                        this.pageNum = '';
                    }
                }else{
                    this.done = false
                    this.xmArr = _arr;
                    this.offset = py;
                    this.pageNum = '';
                }
            })
            .catch(err=>{console.log(err);})
            load.close();
        },
        handleClose(){
            this.$store.dispatch('actChangeDf',false)
        },
        // 上一页
        getPrev(){
            var _offset = this.offset;
            _offset = _offset-10;
            if(_offset < 0){
                myMessage('当前处于第一页，没有上一页');
                _offset = 0;
            }else{
                this.done = false;
                this.originget(this.xmtitle,_offset)
            }
        },
        // 下一页
        getNext(){
            if(!this.done){
                var _offset = this.offset;
                _offset = _offset+10;
                this.originget(this.xmtitle,_offset)
            }else{
                myMessage('已经没有更多数据了哦');
            }
        },
        // 首页
        getFirst(){
            if(this.offset != 0 ){
                this.done = false;
                this.originget(this.xmtitle,0)
            }else{
                myMessage('当前页面处于首页');
            }
            
        },
        // 指定跳转
        getZd(){
            var _num = this.pageNum;
            if(_num){
                var _number = _num-0;
                // 先判断输入的是否是数字
                if(Number.isNaN(_number)){
                    myMessage('请输入正确的数字页码')
                    this.pageNum = '';
                }else{
                    // 进一步判断输入的页码是否超过所有数据
                    this.originget(this.xmtitle,_number*10)
                }
            }else{
                myMessage('请输入数字页码')
            }
        }

    }
}
</script>
<style lang="scss">

    .pop-dialog {
        .el-dialog__header{
            border-bottom: 1px solid #EBEEF5;
        }
        .el-dialog__body{
            padding-top: 0;
        }
        .el-table td{
            padding: 8px 0;
        }
    }
    .btn-div{
        display: flex;
        justify-content: center;
        margin-top: 12px;
        .data-common-btn{
            padding: 0 15px;
            height: 30px;
            line-height: 30px;
            cursor: pointer;
            border-radius: 3px;
            border:none;
            background-color: #e9e9e9;
            color: #606266;
        }
        .prex-btn{
            margin-left: 15px;
        }
        .next-btn{
            margin-left: 15px;
        }
        .page-input-div{
            width: 80px;
            height: 30px;
            position: relative;
            padding-right: 40px;
            margin-left: 15px;
        }
        .page-input{
            width: 100%;
            height: 30px;
            border: 1px solid #dcdcdc;
            border-radius: 3px 0 0 3px ;
        }
        .jump-p{
            position: absolute;
            top:0;
            right: 0;
            border-radius: 0 3px 3px 0;
            background: #dcdcdc;
            height: 30px;
            line-height: 30px;
            width: 40px;
            text-align: center;
            cursor: pointer;
        }
    }
    .pop-player-a{
        color:#606266;
        &:hover{
            text-decoration: underline;
        }
    }
</style>
