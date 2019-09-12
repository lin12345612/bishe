<template>
    <div class="user-outer-div">
        <table>
            <tr class="title-tr">
                <td width="100px">序号</td>
                <td>邮箱</td>
                <td>昵称</td>
            </tr>
            <tr 
                class="common-tr"
                v-for="(item,index) in uArr"
                :key="index"
            >
                <td>{{index+1+curr}}</td>
                <td>{{item.mail}}</td>
                <td>{{item.nickname}}</td>
            </tr>
        </table>
        <div class="btn-div">
            <el-button type="primary" @click="prevBtn" >上一页</el-button>
            <el-button type="primary" @click="nextBtn" >下一页</el-button>
        </div>
    </div>
</template>
<script>
import {getUser} from '@/api/api'
export default {
    name : 'user',
    data(){
        return {
            uArr : [],
            curr : 0
        }
    },
    created(){
        getUser(0).then(res=>{
            console.log(res.data.result);
            this.uArr = res.data.result;
        })
    },
    methods:{
        // 上一页
        prevBtn(){
            if(this.curr > 0){
                let _curr = this.curr - 15;
                getUser(_curr).then(res=>{
                    // console.log(res.data);
                    this.uArr = res.data.result;
                    this.curr = _curr;
                }).catch(err=>{console.log(err);})
            }
        },
        // 下一页
        nextBtn(){
            if(this.uArr.length >= 15){
                let _curr = this.curr + 15;
                getUser(_curr).then(res=>{
                        // console.log(res.data);
                    this.uArr = res.data.result;
                    this.curr = _curr;
                }).catch(err=>{console.log(err);})
            }
        }
    }
}
</script>
<style lang="scss">
    .user-outer-div{
        padding:20px;
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