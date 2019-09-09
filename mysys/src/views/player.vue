<template>
    <div class="player-div">
        <div class="search-div">
            <div class="input-div">
                <el-input v-model="player" placeholder="请输入球员" @keyup.native.enter="searchPlayer"></el-input>
            </div>
            <div class="btn-div">
                <el-button type="primary" @click="searchPlayer">查询</el-button>
            </div>
            <div class="select-cover-div" v-if="condQd">
                <team-select @teamchange="changeCondTeam"></team-select>
            </div>
        </div>
        <div class="new-btn-div">
            <el-button type="primary" @click="addNewPlayer">新增</el-button>
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
                <td  width="240px">操作</td>
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
                            <img :src="item.imgUrl" v-if="item.imgUrl">
                        </span>
                        <div class="chose-file">
                            <input type="file" @change="changeTx(index,$event)">
                        </div>
                        <el-button type="primary" @click="modifyTx(index)">确定</el-button>
                    </div>
                </td>
                <td>
                    <input type="text" class="td-inner-input" v-model="item.imgSrc">
                </td>
                <td>
                    <div class="opera-div">
                        <button class="career-btn" @click="showCareer(index)">生涯数据</button>
                        <button class="honor-btn" @click="showHonor(index)">荣誉</button>
                        <button class="save-btn" @click="saveInfor(index)">保存</button>
                        <button @click="cancelAdd(index)">取消</button>
                    </div>
                </td>
            </tr>
        </table>
        <!-- 荣誉弹窗 -->
        <my-pop :mytitle="mytitle" :mw="mw" :mypop="mypop" :myclass="myclass" @closepop="closepop">
            <div class="honor-pop-div" slot="pcont">
                <div class="search-div">
                    <div class="input-div">
                        <el-input v-model="honor" placeholder="请输入荣誉"></el-input>
                    </div>
                    <div class="btn-div">
                        <el-button type="primary" @click="addHonor">添加</el-button>
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
                    <el-button type="primary" class="add-btn" @click="SureAddHonor">确定添加</el-button>
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
        <!-- 生涯数据弹窗 -->
        <my-pop :mytitle="mytitle" :mw="mw1" :mypop="mycar" :myclass="myclass1" @closepop="closepop1">
            <div class="career-div" slot="pcont">
                <div class="career-new-div" >
                    <textarea class="my-textarea" v-model="career"></textarea>
                    <el-button type="primary" class="add-btn" @click="sendSql">确定添加</el-button>
                </div>
                <p class="show-pid-p">球员id：{{pid}}</p>
                <div class="career-cover-div">
                    <table>
                        <tr class="title-tr">
                            <td>赛季</td>
                            <td>球队</td>
                            <td>总得分</td>
                            <td>总篮板</td>
                            <td>总助攻</td>
                            <td>总抢断</td>
                            <td>总盖帽</td>
                            <td>平均数据</td>
                            <td>操作</td>
                        </tr>
                        <tr 
                            class="common-tr"
                            v-for="(item,index) in careerArr"
                            :key="index"
                        >
                            <td>{{item.season}}</td>
                            <td>{{item.preTeam}}</td>
                            <td>{{item.cPoint}}</td>
                            <td>{{item.cReb}}</td>
                            <td>{{item.cAssist}}</td>
                            <td>{{item.cSteal}}</td>
                            <td>{{item.cBlock}}</td>
                            <td>{{item.aveData}}</td>
                            <td><p class="del-p" @click="handleDel(index)">删除</p></td>
                        </tr>
                    </table>
                </div>
            </div>
        </my-pop>
    </div>
</template>
<script>
import {getTeam,searchPlayerByName,searchPlayerByTeam,operaPlayer,
uploadPlayerTx,getPlayerHonor,addPlayerHonor,delPlayerHonor,
getPlayerCareer,sendSql,delPlayerCareer} from '@/api/api';
import { Message } from 'element-ui';
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
            // 荣誉弹窗部分
            mytitle : '荣誉',
            mw : '50%',
            mypop : false,
            myclass:'player-honor-pop',
            honor : '', //添加荣誉
            newHonorArr : [],  //存储新增荣誉
            hasHonorArr : [],//存储球员荣誉
            // 生涯数据部分弹窗
            mw1 : '60%',
            mycar : false,
            myclass1 : 'player-career-pop',
            pid : 0,   //打开的弹窗对应某个球员的id
            careerArr : [
                {
                    preTeam  : '迈阿密热火',
                    season   : '2018-2019赛季',
                    cPoint   : '1261',
                    cReb     : '620',
                    cAssist  : '570',
                    cSteal   : '120',
                    cBlock   : '50',
                    aveData  : 'xxxxxxxxxxxx'
                }
            ],
            career : ''
        }
    },
    created(){
        this.getTeam();
    },
    methods:{
        getTeam(){
            getTeam().then(res=>{
                // console.log(res.data);
                
                let _arr = [...res.data.info[0],...res.data.info[1]]
                this.tr.push({
                    value : '',
                    label : '无球队'
                })
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
        // 新增球员
        addNewPlayer(){
            let obj = {
                player : '',
                pid    : '',
                qyzt   : 0,
                tid    : '',
                number : '',
                height : '',
                weight : '',
                rookie   : '',
                contract : '',
                imgSrc : '',
                imgUrl : '',
                imgfile : ''
            }
            this.qyxxArr.push(obj)
        },
        // 条件修改
        changeCondTeam(val){
            searchPlayerByTeam(val).then(res=>{
                this.qyxxArr = res.data.result;
            }).catch(err=>{console.log(err);})
        },
        // 改变球员球队
        changeTdTeam(){
            let index = arguments[0]
            let tag = arguments[1][0]
            this.qyxxArr[index].tid = tag
            // console.log(tag);
            // console.log(index);
            // console.log(this.qyxxArr[index].tid);
        },
        // 关闭荣誉弹窗
        closepop(){
            this.mypop = false;
            this.honor = '';
            this.newHonorArr = []
        },
        // 删除即将添加的荣耀
        deleteThis(index){
            this.newHonorArr.splice(index,1)
        },
        // 删除荣耀
        deleteHonor(index){
            // console.log(index);
            // console.log(this.hasHonorArr[index].rid);
            delPlayerHonor(this.hasHonorArr[index].rid).then(res=>{
                // console.log(res.data);
                if(res.data.success){
                    Message.success({
                        message: '删除成功'
                    });
                    this.hasHonorArr.splice(index,1);
                }
            })
        },
        // 打开荣耀弹窗
        showHonor(index){
            if(this.qyxxArr[index].pid){
                this.mytitle = '荣誉'
                this.pid = this.qyxxArr[index].pid;
                this.mypop = true;
                this.requestHonor()
            }
        },
        // 添加荣耀
        addHonor(){
            if(this.honor){
                this.newHonorArr.push(this.honor)
                this.honor = ''
            }
        },
        // 关闭生涯弹窗
        closepop1(){
            this.mycar = false;
            this.career = '';
        },
        // 打开生涯数据弹窗
        showCareer(index){
            this.pid = this.qyxxArr[index].pid;
            this.title="生涯数据"
            this.mycar = true;
            if(this.qyxxArr[index].pid){
                this.requestCareer(this.pid);
            }
        },
        // 更换头像
        changeTx(){
            let index = arguments[0];
            let _e = arguments[1].target.files[0];
            if(_e){
                let _url = URL.createObjectURL(_e)
                this.qyxxArr[index].imgUrl = _url;
                this.qyxxArr[index].imgfile = _e
            }
        },
        // 修改头像确定按钮
        modifyTx(index){
            let formd = new FormData();
            formd.append('myfile',this.qyxxArr[index].imgfile);
            formd.append('path',this.qyxxArr[index].imgSrc);
            // console.log(formd);
            uploadPlayerTx(formd).then(res=>{
                if(res.data.success){
                    Message.success({
                        message: '保存成功'
                    });
                }else{
                    console.log(res.data.msg);
                }
            }).catch(err=>{console.log(err);})
        },
        // 取消按钮
        cancelAdd(index){
            if(!this.qyxxArr[index].pid){
                this.qyxxArr.splice(index,1);
            }
        },
        // 保存按钮
        saveInfor(index){
            let pid = this.qyxxArr[index].pid;
            let qyzt = this.qyxxArr[index].qyzt;
            let player = this.qyxxArr[index].player;
            let tid = this.qyxxArr[index].tid;
            let number = this.qyxxArr[index].number;
            let height = this.qyxxArr[index].height-0;
            let weight = this.qyxxArr[index].weight-0;
            let rookie = this.qyxxArr[index].rookie;
            let contract = this.qyxxArr[index].contract;
            let imgSrc = this.qyxxArr[index].imgSrc;
            operaPlayer(pid,player,tid,qyzt,number,height,weight,rookie,contract,imgSrc).then(res=>{
                // console.log(res.data);
                if(res.data.success){
                    this.qyxxArr[index].pid = res.data.pid;
                    Message.success({
                        message: '保存成功'
                    });
                }
            }).catch(err=>{console.log(err);})
        },
        // 查询按钮
        searchPlayer(){
            // console.log(this.player);
            if(this.player){
                searchPlayerByName(this.player).then(res=>{
                    this.qyxxArr = res.data.result;
                }).catch(err=>{console.log(err);})
            }
        },
        // 添加荣誉按钮
        SureAddHonor(){
            if(this.newHonorArr.length != 0){
                addPlayerHonor(this.pid,this.newHonorArr).then(res=>{
                    if(res.data.success){
                        Message.success({
                            message: '保存成功'
                        });
                        this.newHonorArr = []
                        this.requestHonor()
                    }
                })
            }
        },
        // 请求荣誉数据
        requestHonor(){
            getPlayerHonor(this.pid).then(res=>{
                this.hasHonorArr = res.data.result;
            }).catch(err=>{console.log(err);})
        },
        // 请求生涯数据
        requestCareer(){
            getPlayerCareer(this.pid).then(res=>{
                this.careerArr = res.data.result;
            }).catch(err=>{console.log(err);})
        },
        // 添加生涯数据按钮
        sendSql(){
            if(this.career){
                sendSql(this.career).then(res=>{
                    if(res.data.success){
                        Message.success({
                            message: '添加成功'
                        });
                        this.career = '';
                        this.requestCareer();
                    }
                })
            }
        },
        // 删除球员生涯数据
        handleDel(index){
            // console.log(this.careerArr[index].sid);
            delPlayerCareer(this.careerArr[index].sid).then(res=>{
                if(res.data.success){
                    Message.success({
                        message: '删除成功'
                    });
                    this.careerArr.splice(index,1);
                }
            })
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
        .honor-btn{
            margin: 0 10px;
        }
        .save-btn{
            margin-right: 10px;
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
            flex-wrap: wrap;
        }
        .honor-item-sec{
            padding: 0 30px 0 5px;
            position: relative;
            height: 24px;
            line-height: 24px;
            background-color: rgba(64, 158, 255,.9);
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
    }
    .player-career-pop{
        .career-new-div{
            width: 100%;
            padding-right: 150px;
            box-sizing: border-box;
            position: relative;
        }
        .my-textarea{
            width: 100%;
            min-height: 150px;
        }
        .add-btn{
            @include set-pt;
            right: 10px;
        }
        .career-cover-div{
            min-height: 150px;
            max-height: 300px;
            overflow: auto;
            position: relative;
        }
        .del-p{
            color: red;
            cursor: pointer;
        }
        .show-pid-p{
            height: 30px;
            line-height: 30px;
            border: 1px solid #ddd;
            margin: 5px 0;
            padding-left: 30px;
            color: red;
        }
    }
</style>