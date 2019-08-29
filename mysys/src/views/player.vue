<template>
    <div class="player-div">
        <div class="search-div">
            <div class="input-div">
                <el-input v-model="player" placeholder="请输入球员"></el-input>
            </div>
            <div class="btn-div">
                <el-button type="primary">查询</el-button>
            </div>
            <div class="select-cover-div" v-if="condQd">
                <team-select @teamchange="changeCondTeam"></team-select>
            </div>
        </div>
        <div class="new-btn-div">
            <el-button type="primary">新增</el-button>
        </div>
        <table>
            <tr class="title-tr">
                <td width="150px">球员</td>
                <td width="100px">状态</td>
                <td width="120px">球队</td>
                <td width="60px">号码</td>
                <td width="60px">身高</td>
                <td width="60px">体重</td>
                <td width="180px">选秀</td>
                <td>合同</td>
                <td>头像</td>
                <td>头像地址</td>
                <td  width="200px">操作</td>
            </tr>
            <tr 
                class="common-tr"
                v-for="(item,index) in qyxxArr"
                :key="index"
            >
                <td>
                    <input type="text" class="td-inner-input" v-model="item.player">
                </td>
                <td>
                    <el-select v-model="item.qyzt" placeholder="请选择">
                        <el-option
                            v-for="item in ztArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </td>
                <td>
                    <el-select v-model="item.tid" placeholder="请选择">
                        <el-option
                            v-for="(item,index) in tr"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                        >
                        </el-option>
                    </el-select>
                </td>
                <td>
                    <input type="text" class="td-inner-input" v-model="item.number">
                </td>
                <td>
                    <input type="text" class="td-inner-input" v-model="item.height">
                </td>
                <td>
                    <input type="text" class="td-inner-input" v-model="item.weight">
                </td>
                <td>
                    <input type="text" class="td-inner-input" v-model="item.rookie">
                </td>
                <td>
                    <input type="text" class="td-inner-input" v-model="item.contract">
                </td>
                <td>
                    <div class="img-cover-div">
                        <span class="span-img">
                            <img :src="item.imgSrc" v-if="item.imgSrc">
                        </span>
                        <div class="chose-file">
                            <input type="file">
                        </div>
                        <el-button type="primary">确定</el-button>
                    </div>
                </td>
                <td>
                    <input type="text" class="td-inner-input" v-model="item.imgSrc">
                </td>
                <td>
                    <div class="opera-div">
                        <button class="career-btn">生涯数据</button>
                        <button class="honor-btn" @click="showHonor(index)">荣誉</button>
                        <button class="save-btn">保存</button>
                    </div>
                </td>
            </tr>
        </table>
        <my-pop :mytitle="mytitle" :mw="mw" :mypop="mypop" :myclass="myclass" @closepop="closepop">
            <div class="honor-pop-div" slot="pcont">
                <div class="search-div">
                    <div class="input-div">
                        <el-input v-model="honor" placeholder="请输入荣誉"></el-input>
                    </div>
                    <div class="btn-div">
                        <el-button type="primary">添加</el-button>
                    </div>
                </div>
                <div class="honor-new-div">
                    <div class="honor-new-cover-div">
                        <section 
                            v-for="(item,index) in newHonorArr"
                            :key="index"
                            class="honor-item-sec"
                        >
                            {{item}}
                            <i class="el-dialog__close el-icon el-icon-close my-i" @click="deleteThis(index)"></i>
                        </section>
                    </div>
                    <el-button type="primary" class="add-btn">确定添加</el-button>
                </div>
                <div class="honor-old-div honor-new-cover-div">
                    <section 
                        v-for="(item,index) in hasHonorArr"
                        :key="index+1"
                        class="honor-item-sec"
                    >
                        {{item.honor}}
                        <i class="el-dialog__close el-icon el-icon-close my-i" @click="deleteHonor(index)"></i>
                    </section>
                </div>
            </div>
        </my-pop>
    </div>
</template>
<script>
import {getTeam} from '@/api/api';
import teamSelect from '@/components/select-team.vue'
import MyPop from '@/components/my-pop.vue'
export default {
    name : 'player',
    components:{teamSelect,MyPop},
    data(){
        return {
            player:'',
            tr :[],
            condQd :false,
            ztArr : [
                {
                    label : '正常',
                    value : 0
                },
                {
                    label : '待业',
                    value : 1
                },
                {
                    label : '退役',
                    value : 2
                }
            ],
            qyxxArr :[
                // {
                //     player : '詹姆斯',
                //     pid    : 78,
                //     qyzt   : 0,
                //     tid    : 'wteam09',
                //     number : '23',
                //     height : 2.13,
                //     weight : 100,
                //     rookie   : '2003年第一轮第一顺位',
                //     contract : 'xxxxx',
                //     imgSrc : '/images/tx/laker/LeBron-James.jpg',
                //     imgfile : ''
                // }
            ],
            mytitle : '新增生涯数据',
            mw : '50%',
            mypop : true,
            myclass:'player-honor-pop',
            honor : '', //添加荣誉
            newHonorArr : ['hahha','2017-2018赛季最佳阵容一阵'],
            hasHonorArr : [
                {
                    rid:1,
                    honor : '2017-2018赛季最佳阵容一阵'
                },
                {
                    rid:1,
                    honor : '2017-2018赛季最佳防守阵容一阵'
                }
            ],
            pid : '',   //打开的弹窗对应于某个球员
        }
    },
    created(){
        this.getTeam();
        setTimeout(()=>{
            this.qyxxArr = [{
                    player : '詹姆斯',
                    pid    : 78,
                    qyzt   : 0,
                    tid    : 'wteam09',
                    number : '23',
                    height : 2.13,
                    weight : 100,
                    rookie   : '2003年第一轮第一顺位',
                    contract : 'xxxxx',
                    imgSrc : '/images/tx/laker/LeBron-James.jpg',
                    imgfile : ''
                }
            ]
        },1000)
    },
    methods:{
        getTeam(){
            getTeam().then(res=>{
                // console.log(res.data);
                let _arr = [...res.data.info[0],...res.data.info[1]]
                for(let i = 0 ; i < _arr.length;i++){
                    let _obj = {
                        value : _arr[i].tid,
                        label : _arr[i].tName
                    }
                    this.tr.push(_obj)
                }
                this.condQd = true;
                this.$store.commit('changeTeam',_arr)
                // console.log(_arr);
            }).catch(err=>{console.log(err);})
        },
        // 条件修改
        changeCondTeam(val){
            console.log(val);
        },
        // 改变球员球队
        changeTdTeam(){
            let index = arguments[0]
            let tag = arguments[1][0]
            this.qyxxArr[index].tid = tag
            console.log(tag);
            console.log(index);
            console.log(this.qyxxArr[index].tid);
        },
        closepop(){
            this.mypop = false;
            this.honor = '';
            this.newHonorArr = []
        },
        // 删除即将添加的荣耀
        deleteThis(index){
            console.log(index);
        },
        // 删除荣耀
        deleteHonor(index){
            console.log(index);
        },
        // 打开荣耀弹窗
        showHonor(index){

        }
    }
}
</script>
<style lang="scss">
    .player-div{
        padding: 20px;
        width: 100%;
        height: 100%;
        position: relative;
        .search-div{
            display: flex;
        }
        .input-div{
            width: 30%;
            margin-right: 30px;
        }
        .btn-div{
            margin-right: 30px;
        }
        .new-btn-div{
            margin: 20px 0; 
        }
        .td-inner-input{
            border:1px solid #eee;;
            width: 100%;
            height: 40px;
        }
        .opera-div{
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
            position: relative;
            button{
                color: rgb(255, 255, 255);
                background-color: rgb(64, 158, 255);
                border-color: rgb(64, 158, 255);
                height: 30px;
                border-radius: 5px;
                cursor: pointer;
            }
        }
        .career-btn{

        }
        .honor-btn{
            margin: 0 15px;
        }
        .save-btn{

        }
        .img-cover-div{
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            position: relative;
        }
        .span-img{
            display: block;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            position: relative;
            margin-right: 50px;
            img{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .chose-file{
            width: 100px;
            overflow: hidden;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            z-index: 99;
            opacity: 0;
        }
    }
    .honor-pop-div{

        .search-div{
            display: flex;
        }
        .input-div{
            width: 30%;
            margin-right: 30px;
        }
        .btn-div{
            margin-right: 30px;
        }
        .honor-new-div{
            width: 100%;
            padding-right: 150px;
            box-sizing: border-box;
            position: relative;
        }
        .honor-new-cover-div{
            display: flex;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 3px;
            min-height: 30px;
            position: relative;
            margin-top: 15px;
        }
        .honor-item-sec{
            padding: 0 30px 0 5px;
            position: relative;
            height: 24px;
            line-height: 24px;
            background-color: rgb(64, 158, 255);
            color:#fff;
            border-radius: 3px;
            margin: 0 10px 10px 0
        }
        .my-i{
            @include set-pt;
            right: 5px;
            cursor: pointer;
        }
        .add-btn{
            @include set-pt;
            right: 10px;
        }
        .honor-old-div{
        }
    }
</style>