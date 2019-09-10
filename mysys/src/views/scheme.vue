<template>
    <div class="scheme-outer-div">
        <div class="filter-div">
            <el-date-picker
                v-model="dateVal"
                type="date"
                value-format="yyyy-MM-dd"
                @change="filterScheme"
                placeholder="选择日期">
            </el-date-picker>
            <el-button type="danger" class="scheme-btn" @click="multiDel">批量删除</el-button>
            <el-button type="primary" class="scheme-btn" @click="showPop">新增赛程</el-button>
            <el-button type="primary" class="scheme-btn" @click="resetScheme" ref="mysc">所有赛程</el-button>
        </div>
        <table>
            <tr class="title-tr">
                <td width="50px"></td>
                <td>日期</td>
                <td>是否完赛</td>
                <td>主队</td>
                <td>客队</td>
                <td>比分</td>
                <td>操作</td>
            </tr>
            <tr 
                class="common-tr"
                v-for="(item,index) in scArr"
                :key="index"
            >
                <td>
                    <el-checkbox v-model="item.hasChosen" @change="operaScheme(index)"></el-checkbox>
                </td>
                <td>{{handleTime(item.pDate)}}</td>
                <td>{{item.done}}</td>
                <td>{{item.hTeam}}</td>
                <td>{{item.rTeam}}</td>
                <td>{{item.tscore ? item.tscore : '--:--'}}</td>
                <td><p class="del-p" @click="singleDel(index)">删除</p></td>
            </tr>
        </table>
        <div class="btn-div">
            <el-button type="primary" @click="prevBtn" >上一页</el-button>
            <el-button type="primary" @click="nextBtn" >下一页</el-button>
        </div>
        <my-pop :mytitle="mytitle" :mypop="mypop" :myclass="myclass" @closepop="closePop">
            <div class="cont-div" slot="pcont">
                <textarea class="sql-textarea" v-model="sql"></textarea>
                <el-button type="primary" @click="sendSql">确定</el-button>
            </div>
        </my-pop>
    </div>
</template>
<script>
import {getScheme,filterScheme,delScheme,sendSql} from '@/api/api.js'
import MyPop from '@/components/my-pop.vue'
import utils from '@/utils/utils'
import { Message } from 'element-ui';
export default {
    name :'scheme',
    components:{MyPop},
    data(){
        return {
            dateVal : '',
            scArr : [],
            currpage : 0,
            choseArr : [],
            mytitle : '新增赛程',
            myclass : 'news-pop-div',
            mypop : false,
            sql : ''
        }
    },
    created(){
        getScheme(0).then(res=>{
            // console.log(res.data);
            this.scArr = res.data.result.map(val=>{
                val.hasChosen = false;
                return val
            })
            // console.log(this.scArr);
        }).catch(err=>{console.log(err);})
    },
    methods:{
        filterScheme(){
            // console.log(this.dateVal);
            if(this.dateVal){
                filterScheme(this.dateVal).then(res=>{
                    this.scArr = res.data.result.map(val=>{
                        val.hasChosen = false;
                        return val
                    })
                }).catch(err=>{console.log(err);})
            }
        },
        handleTime(time){
            return utils.recordTime(time)
        },
        prevBtn(){
            if(this.currpage != 0){
                this.currpage = this.currpage - 15;
                getScheme(this.currpage).then(res=>{
                    this.scArr = res.data.result.map(val=>{
                        val.hasChosen = false;
                        return val
                    })
                }).catch(err=>{console.log(err);})
            }
        },
        nextBtn(){
            if(this.scArr.length >= 15){
                this.currpage = this.currpage + 15;
                getScheme(this.currpage).then(res=>{
                    this.scArr = res.data.result.map(val=>{
                        val.hasChosen = false;
                        return val
                    })
                }).catch(err=>{console.log(err);})
            }
        },
        resetScheme(){
            this.currpage = 0;
            this.dateVal = ''
            getScheme(0).then(res=>{
                this.scArr = res.data.result.map(val=>{
                    val.hasChosen = false;
                    return val
                })
            }).catch(err=>{console.log(err);})
        },
        singleDel(index){
            // console.log(this.scArr[index].scKey);
            let arr = [];
            arr.push(this.scArr[index].scKey);
            delScheme(arr).then(res=>{
                if(res.data.success){
                    Message({
                        type : 'success',
                        message : '删除成功',
                        duration : 1500
                    })
                    this.$refs.mysc.$el.click();
                }
            }).catch(err=>{console.log(err);})
            
        },
        // 多选框
        operaScheme(index){
            // console.log(this.scArr[index].hasChosen);
            if(this.scArr[index].hasChosen){
                this.choseArr.push(this.scArr[index].scKey)
            }else{
                let _index = this.choseArr.indexOf(this.scArr[index].scKey);
                this.choseArr.splice(_index,1)
            }
            // console.log(this.choseArr);
        },
        multiDel(){
            // console.log(this.choseArr);
            // console.log(this.$refs.mysc.$el);
            if(this.choseArr.length == 0){
                Message({
                    type : 'warning',
                    message : '未选中任何比赛',
                    duration : 1500
                })
            }else{
                delScheme(this.choseArr).then(res=>{
                    if(res.data.success){
                        Message({
                            type : 'success',
                            message : '删除成功',
                            duration : 1500
                        })
                        this.$refs.mysc.$el.click();
                    }
                }).catch(err=>{console.log(err);})
            }
        },
        showPop(){
            this.mypop = true;
        },
        closePop(){
            this.mypop = false;
        },
        sendSql(){
            if(this.sql){
                sendSql(this.sql).then(res=>{
                    if(res.data.success){
                        Message.success({
                            message: '执行成功'
                        });
                        this.sql = '';
                    }
                })
            }
        }

    }
}
</script>
<style lang="scss">
    .scheme-outer-div{
        width:100%;
        height: 100%;
        padding: 20px;
        .filter-div{
            display: flex;
            margin-bottom:20px;
        }
        .scheme-btn{
            margin-left: 40px;
        }
        .del-p{
            color: red;
            cursor: pointer;
        }
        table{
            margin-bottom: 40px;
        }
        .btn-div{
            display: flex;
            justify-content: center;
            margin-top:30px ;
            button:nth-of-type(1){
                margin-right: 20px;
            }
        }
    }
    .news-pop-div{
        height: 400px;
        .sql-textarea{
            width: 100%;
            height: 200px;
            margin-bottom: 20px;
        }
    }
</style>