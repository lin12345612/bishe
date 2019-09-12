<template>
    <div class="hp-outer-div">
        <!-- 热门球星 -->
        <div class="filter-div">
            <div class="input-div">
                <el-input v-model="player" placeholder="请输入球员" @keyup.native.enter="searchPlayer"></el-input>
            </div>
            <el-button type="primary" @click="searchPlayer">查询</el-button>
        </div>
        <div class="hx-div">
            <section 
                class="hx-item-sec"
                v-for="(item,index) in arr1"
                :key="index"
            >
                {{item.player}}
                <p class="set-p" @click="setWel(index)">设为热门球星</p>
            </section>
        </div>
        <table>
            <tr class="title-tr">
                <td>球员</td>
                <td>id</td>
                <td>操作</td>
            </tr>
            <tr 
                class="common-tr"
                v-for="(item,index) in welArr"
                :key="index+1"
            >
                <td>{{item.player}}</td>
                <td>{{item.pid}}</td>
                <td><p class="del-p" @click="cancelWel(index)">取消设置</p></td>
            </tr>
        </table>
    </div>
</template>
<script>
import {searchPlayerByName,getWelPlayer,setWelPlayer,cancelWelPlayer} from '@/api/api';
export default {
    name : 'hotplayer',
    data(){
        return {
            player : '',
            arr1 : [],
            welArr : []
        }
    },
    created(){
        this.requestDate()
    },
    methods:{
        searchPlayer(){
            if(this.player){
                searchPlayerByName(this.player).then(res=>{
                    // console.log(res.data);
                    this.arr1 = res.data.result;
                }).catch(err=>{console.log(err);})
            }
        },
        requestDate(){
            getWelPlayer().then(res=>{
                this.welArr = res.data.result;
                // console.log(this.welArr);
            })
        },
        setWel(index){
            // console.log(this.arr1[index]);
            setWelPlayer(this.arr1[index].pid,this.arr1[index].player).then(res=>{
                if(res.data.success){
                    this.arr1.splice(index,1);
                    this.requestDate();
                }
            })
        },
        cancelWel(index){
            // console.log(this.welArr[index].sid);
            cancelWelPlayer(this.welArr[index].sid).then(res=>{
                if(res.data.success){
                    this.welArr.splice(index,1);
                }
            })
        }
    }
}
</script>
<style lang="scss">
    .hp-outer-div{
        padding: 20px;
        position: relative;
        .filter-div{
            display: flex;
            button{
                margin-left: 20px;
            }
        }
        .input-div{
            width: 200px;
        }
        .hx-div{
            margin: 20px 0 ;
            padding: 20px 20px 0;
            position: relative;
            display: flex;
            flex-wrap: wrap;
            border: 1px solid #ddd;
        }
        .hx-item-sec{
            height: 40px;
            padding: 0 100px 0 15px;
            margin:0 15px 15px 0;
            border-radius: 5px;
            border: 1px solid #ddd;
            line-height: 40px;
            position: relative;
        }
        .set-p{
            height: 20px;
            line-height: 20px;
            padding: 0 5px;
            position: absolute;
            top:50%;
            transform: translateY(-50%);
            right: 5px;
            background: rgb(64, 158, 255);
            color: #fff;
            border-radius: 5px;
            margin: 0;
            font-size: 12px;
            cursor: pointer;
        }
        .del-p{
            color: red;
            cursor: pointer;
        }
    }
</style>