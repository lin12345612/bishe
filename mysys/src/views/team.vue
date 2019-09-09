<template>
    <div class="myteam-cover">
        <div class="filter-div">
            <div class="team-select-cover">
                <team-select @teamchange="handleTeam"></team-select>
            </div>
            <el-button type="primary" @click="openPop">更新球员数据</el-button>
            <el-button type="primary" @click="openPop">插入球员新赛季数据</el-button>
        </div>
        <div class="table-div">
            <table>
                <tr class="title-tr">
                    <td width="80px">id</td>
                    <td width="80px">分区</td>
                    <td  width="80px">队名</td>
                    <td  width="100px">全名</td>
                    <td  width="50px">胜场</td>
                    <td  width="50px">负场</td>
                    <td width="60px">胜率</td>
                    <td width="60px">排名</td>
                    <td  width="100px">近况</td>
                    <td>描述</td>
                    <td>教练</td>
                    <td>球馆</td>
                    <td>logo地址</td>
                    <td>logo</td>
                    <td>操作</td>
                </tr>
                <tr 
                    class="common-tr"
                    v-for="(item,index) in teamArr"
                    :key="index"
                >
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.tid">
                    </td>
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.part">
                    </td>
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.tName">
                    </td>
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.fName">
                    </td>
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.wNum">
                    </td>
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.fNum">
                    </td>
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.rate">
                    </td>
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.ranks">
                    </td>
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.states">
                    </td>
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.tDes">
                    </td>
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.coach">
                    </td>
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.groupName">
                    </td>
                    <td>
                        <input type="text" class="td-inner-input" v-model="item.logoSrc">
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
                        <el-button type="primary" @click="saveInfor(index)">保存</el-button>
                    </td>
                </tr>
            </table>
        </div>
        <my-pop :mytitle="mytitle" :mypop="mypop" :myclass="myclass" @closepop="closePop">
            <div class="cont-div" slot="pcont">
                <div class="condi-div">
                    <div class="input-cover-div">
                        <el-input v-model="player" placeholder="请输入球员id" ></el-input>
                    </div>
                    <el-button type="primary" @click="enterId">生成sql语句</el-button>
                </div>
                <textarea class="sql-textarea" v-model="sql"></textarea>
                <el-button type="primary" @click="sendSql">确定</el-button>
            </div>
        </my-pop>
    </div>
</template>
<script>
import teamSelect from '@/components/select-team';
import myPop from '@/components/my-pop'
import {getTeamInfor,modifyTeam,uploadPlayerTx,sendSql} from '@/api/api';
import { Message } from 'element-ui';
export default {
    name : 'team',
    components:{teamSelect,myPop},
    data(){
        return {
            teamArr : [
                // {
                //     tid : 'wteam01',
                //     part : '西部',
                //     fName : '休斯顿火箭',
                //     tName : '火箭',
                //     wNum : 30,
                //     fNum : 10,
                //     rate : 0.75,
                //     rank : 4,
                //     states : '1连胜',
                //     logoSrc : '../../images/logo/rocket.svg',
                //     tDes : 'hahahahha',
                //     coach : '德安东尼',
                //     groupName : '丰田中心'
                // }
            ],
            mytitle : '赛季球员数据管理',
            mypop : false,
            mw : '600px',
            myclass : 'team-data-cover-div',
            player : '',
            sql : '',
            theTeam : ''
        }
    },
    methods:{
        handleTeam(val){
            // console.log(val);
            if(val){
               getTeamInfor(val).then(res=>{
                //    console.log(res.data);
                   let obj = {
                        sid : res.data.info[0][0].sid,
                        tid : val,
                        part : res.data.info[0][0].part,
                        fName : res.data.info[0][0].fName,
                        tName : res.data.info[0][0].tName,
                        wNum : res.data.info[0][0].wNum,
                        fNum : res.data.info[0][0].fNum,
                        rate : res.data.info[0][0].rate,
                        ranks : res.data.info[0][0].ranks,
                        states : res.data.info[0][0].states,
                        logoSrc : res.data.info[0][0].logoSrc,
                        tDes : res.data.info[0][0].tDes,
                        coach : res.data.info[0][0].coach,
                        groupName : res.data.info[0][0].groupName,
                        imgUrl : res.data.info[0][0].logoSrc,
                        imgfile : ''
                   }
                   this.teamArr = [];
                   this.teamArr.push(obj)
                   let _zr = res.data.info[1];
                   let _team = ''
                   for(var f = 0 ; f < _zr.length ; f++){
                      if(f != _zr.length-1 ){
                        _team += `${_zr[f].pid},`
                      }else{
                        _team += `${_zr[f].pid}`
                      }
                   }
                //    console.log(_team);
                this.player = _team;
               }).catch(err=>{console.log(err);})
            }
        },
         // 更换头像
        changeTx(){
            let index = arguments[0];
            let _e = arguments[1].target.files[0];
            // console.log(_e);
            if(_e){
                let _url = URL.createObjectURL(_e)
                this.teamArr[index].imgUrl = _url;
                this.teamArr[index].imgfile = _e
            }
        },
        // 修改头像确定按钮
        modifyTx(index){
            let formd = new FormData();
            formd.append('myfile',this.teamArr[index].imgfile);
            formd.append('path',this.teamArr[index].logoSrc);
            uploadPlayerTx(formd).then(res=>{
                if(res.data.success){
                    Message.success({
                        message: '保存成功'
                    });
                }
            }).catch(err=>{console.log(err);})
        },
        // 保存球队信息
        saveInfor(index){
            // console.log(this.teamArr[index]);
            let sid = this.teamArr[index].sid;
            let part = this.teamArr[index].part;
            let tid = this.teamArr[index].tid;
            let fName = this.teamArr[index].fName;
            let tName = this.teamArr[index].tName;
            let wNum  = this.teamArr[index].wNum;
            let fNum = this.teamArr[index].fNum;
            let rate = this.teamArr[index].rate;
            let ranks = this.teamArr[index].ranks;
            let states = this.teamArr[index].states;
            let logoSrc = this.teamArr[index].logoSrc;
            let tDes = this.teamArr[index].tDes;
            let coach = this.teamArr[index].coach;
            let groupName = this.teamArr[index].groupName;
            modifyTeam(sid,part,tid,fName,tName,wNum,fNum,rate,ranks,states,logoSrc,tDes,coach,groupName).then(res=>{
                // console.log(res.data);
                if(res.data.success){
                    Message.success({
                        message: '保存成功'
                    });
                }
            }).catch(err=>{console.log(err);})
        },
        // 关闭弹窗
        closePop(){
            this.mypop = false;
        },
        // 打开弹窗
        openPop(){
            if(this.teamArr[0]){
                this.theTeam = this.teamArr[0].fName;
                this.mypop = true;
            }else{
                alert('请选择球队')
            }
            // console.log(this.theTeam);
        },
        // 确定球员id
        enterId(){
            if(this.player){
                let arr = this.player.split(',')
                let _str = "INSERT INTO playercareer(pid,preTeam,season,cPoint,cReb,cSteal,cAssist,cBlock,aveData) VALUES "
                let str1 = "UPDATE playerinfor SET ",
                    str2 = "points=CASE pid ",
                    str3 = "reb=CASE pid ",
                    str4 = "assist=CASE pid ",
                    str5 = "steal=CASE pid ",
                    str6 = "block=CASE pid ",
                    tj = '(';
                for(var g = 0 ; g < arr.length ; g++){
                    let _inner = `('${arr[g]}','${this.theTeam}','2019-2020',0,0,0,0,0,null)`
                    str2 += "WHEN "+ arr[g] +" THEN 0 "
                    str3 += "WHEN "+ arr[g] +" THEN 0 "
                    str4 += "WHEN "+ arr[g] +" THEN 0 "
                    str5 += "WHEN "+ arr[g] +" THEN 0 "
                    str6 += "WHEN "+ arr[g] +" THEN 0 "
                    if(g != arr.length -1 ){
                        tj += `${arr[g]},`
                        _str += _inner + ',';
                    }else{
                        tj += `${arr[g]})`
                        _str += _inner + ';';
                    }
                }
                str1 = str1 + str2 + ' END,'+ str3 + ' END,' + str4 +' END,' + str5 + ' END,'+ str6 + ' END ' + 'WHERE pid in ' + tj + ';'
                this.sql = _str +str1
            }
        },
        // 确定发送sql
        sendSql(){
            if(this.sql){
                sendSql(this.sql).then(res=>{
                    if(res.data.success){
                        Message.success({
                            message: '执行成功'
                        });
                        this.sql = '';
                    }
                }).catch(err=>{console.log(err);})
            }
        }
    }
}
</script>
<style lang="scss">
    .myteam-cover{
        padding: 20px;
        position: relative;
        .filter-div{
            display: flex;
            margin-bottom: 20px;
        }
        .team-select-cover{
            width: 200px;
            position: relative;
            & + button{
                margin: 0 10px;
            }
        }
        .table-div{
            width: 100%;
            position: relative;
        }
        .td-inner-input{
            border:1px solid #eee;;
            width: 100%;
            height: 40px;
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
            margin-right: 10px;
            img{
                display: block;
                // width: 100%;
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
    .team-data-cover-div{
        height: 400px;
        .condi-div{
            display: flex;
        }
        .input-cover-div{
            width: 400px;
            position: relative;
            margin-right: 40px;
        }
        .sql-textarea{
            width: 100%;
            height: 150px;
            margin:20px  0;
        }
    }
</style>