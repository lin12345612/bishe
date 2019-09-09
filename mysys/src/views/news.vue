<template>
    <div class="news-outer-div">
        <div class="condi-outer-div">
            <div class="team-cover-div">
                <team-select @teamchange="changeCondTeam"></team-select>
            </div>
            <el-button type="primary" @click="addNews" class="add-news-btn">新增新闻</el-button>
        </div>
        <table>
            <tr class="title-tr">
                <td>序号</td>
                <td>标题</td>
                <td>链接</td>
                <td width="100px">操作</td>
            </tr>
            <tr 
                class="common-tr"
                v-for="(item,index) in newArr"
                :key="index"
            >
                <td>{{index+currPage+1}}</td>
                <td>{{item.newTitle}}</td>
                <td>{{item.newSrc}}</td>
                <td><p class="del-p" @click="delNews(index)">删除</p></td>
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
import teamSelect from '@/components/select-team.vue'
import MyPop from '@/components/my-pop.vue'
import { Message } from 'element-ui';
import {getTeamNews,delNews,sendSql} from '@/api/api'
export default {
    name : 'news',
    components:{teamSelect,MyPop},
    data(){
        return {
            newArr :[
                // {
                //     kid : 1,
                //     newTitle : '这是新闻',
                //     newSrc : 'xxxxxxxxxxx'
                // }
            ],
            currPage : 0,
            team : '',
            mytitle : '新增新闻',
            myclass : 'news-pop-div',
            mypop : false,
            sql : ''
        }
    },
    methods:{
        changeCondTeam(val){
            // console.log(val);
            this.team = val;
            this.currPage = 0;
            getTeamNews(val,0).then(res=>{
                // console.log(res.data);
                this.newArr = res.data.result;
            }).catch(err=>{console.log(err);})
        },
        // 新增新闻
        addNews(){
            this.mypop = true;
        },
        // 删除新闻
        delNews(index){
            // console.log(this.newArr[index].keyid);
            delNews(this.newArr[index].keyid).then(res=>{
                if(res.data.success){
                    Message.success({
                        message: '删除成功'
                    });
                    getTeamNews(this.team,0).then(res=>{
                        // console.log(res.data);
                        this.currPage = 0;
                        this.newArr = res.data.result;
                    }).catch(err=>{console.log(err);})
                }
            })
        },
        // 上一页
        prevBtn(){
            if(this.currPage > 0){
                let _curr = this.currPage - 8;
                getTeamNews(this.team,_curr).then(res=>{
                    // console.log(res.data);
                    this.newArr = res.data.result;
                    this.currPage = _curr;
                }).catch(err=>{console.log(err);})
            }
        },
        // 下一页
        nextBtn(){
            if(this.newArr.length >= 8){
                let _curr = this.currPage + 8;
                getTeamNews(this.team,_curr).then(res=>{
                        // console.log(res.data);
                    this.newArr = res.data.result;
                    this.currPage = _curr;
                }).catch(err=>{console.log(err);})
            }
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
    .news-outer-div{
        position: relative;
        width: 100%;
        height: 100%;
        padding: 20px;
        .condi-outer-div{
            display: flex;
            margin-bottom: 20px;
        }
        .team-cover-div{
            width: 300px;
        }
        .add-news-btn{
            margin-left: 30px;
        }
        .del-p{
            cursor: pointer;
            color: red;
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