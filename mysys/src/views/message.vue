<template>
    <div class="msg-cover-div">
        <table>
            <tr class="title-tr">
                <td width="100px">序号</td>
                <td>留言</td>
            </tr>
            <tr 
                class="common-tr"
                v-for="(item,index) in msgArr"
                :key="index"
            >
                <td>{{curr + 1 + index}}</td>
                <td>{{item.opinion}}</td>
            </tr>
        </table>
        <div class="btn-div">
            <el-button type="primary" @click="prevBtn" >上一页</el-button>
            <el-button type="primary" @click="nextBtn" >下一页</el-button>
        </div>
    </div>
</template>
<script>
import {getMessage} from '@/api/api'
export default {
    name : 'message',
    data(){
        return {
            msgArr : [],
            curr : 0
        }
    },
    created(){
        this.requestData(0)
    },
    methods:{
        requestData(page){
            getMessage(page).then(res=>{
                this.msgArr = res.data.result;
                this.curr = page;
            }).catch(err=>{console.log(err);})
        },
        // 上一页
        prevBtn(){
            if(this.curr > 0){
                let _curr = this.curr - 18;
                this.requestData(_curr)
            }
        },
        // 下一页
        nextBtn(){
            if(this.msgArr.length >= 18){
                let _curr = this.currPage + 18;
                this.requestData(_curr)
            }
        },
    }
}
</script>
<style lang="scss">
    .msg-cover-div{
        padding: 20px;
        position: relative;
        .btn-div{
            display: flex;
            justify-content: center;
            margin-top:30px ;
            button:nth-of-type(1){
                margin-right: 20px;
            }
        }
    }
</style>