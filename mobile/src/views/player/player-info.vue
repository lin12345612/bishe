<template>
    <div class="player-infor-div">
        <my-head :title="title">
            <section class="head-opera-sec" slot="opera" @click="gzClick">{{gzbt}}<i :class="{'myweb-icon-yx':isAtt,'myweb-icon-wx':!isAtt}"></i></section>
        </my-head>
        <span class="bg-span"></span>
        <div class="player-base-infor">
            <div class="qytx-span">
                <van-image
                    lazy-load
                    :src="baseInfor.imgSrc"
                    v-if="isLoad"
                />
            </div>
            <div class="base-infor-div">
                <p class="base-infor-p" v-if="baseInfor.tid">球队：{{getTeamName(baseInfor.tid)}}</p>
                <p class="base-infor-p">号码：{{baseInfor.number}}</p>
                <p class="base-infor-p">身高：{{baseInfor.height}}米</p>
                <p class="base-infor-p">体重：{{baseInfor.weight}}公斤</p>
            </div>
            <p class="season-data-p" v-if="baseInfor.points">{{baseInfor.points}}分{{baseInfor.reb}}篮板{{baseInfor.assist}}助攻</p>
        </div>
        <p class="rookie-p">选秀：{{baseInfor.rookie}}</p>
        <section class="contract-sec" v-if="baseInfor.contract"><p>合同：</p>{{baseInfor.contract}}</section>
        <van-tabs v-model="nrIndex">
            <van-tab title="生涯数据">
                <div class="sysj-div">
                    <van-tabs type="card">
                        <van-tab title="总数">
                            <div class="data-common-div title-div">
                                <section class="data-common-sec long-sec">赛季</section>
                                <section class="data-common-sec short-sec">球队</section>
                                <section class="data-common-sec short-sec">得分</section>
                                <section class="data-common-sec short-sec">篮板</section>
                                <section class="data-common-sec short-sec">助攻</section>
                                <section class="data-common-sec short-sec">抢断</section>
                                <section class="data-common-sec short-sec">盖帽</section>
                            </div>
                            <div 
                                class="data-common-div"
                                v-for="(item,index) in syData"
                                :key="index+item"
                            >
                                <section class="data-common-sec long-sec">{{item.season}}</section>
                                <section class="data-common-sec short-sec">{{handleQd(item.preTeam)}}</section>
                                <section class="data-common-sec short-sec">{{item.cPoint}}</section>
                                <section class="data-common-sec short-sec">{{item.cReb}}</section>
                                <section class="data-common-sec short-sec">{{item.cAssist}}</section>
                                <section class="data-common-sec short-sec">{{item.cSteal}}</section>
                                <section class="data-common-sec short-sec">{{item.cBlock}}</section>
                            </div>
                        </van-tab>
                        <van-tab title="场均">
                            <div class="data-common-div title-div">
                                <section class="data-common-sec long-sec">赛季</section>
                                <section class="data-common-sec short-sec">球队</section>
                                <section class="data-common-sec short-sec">得分</section>
                                <section class="data-common-sec short-sec">篮板</section>
                                <section class="data-common-sec short-sec">助攻</section>
                                <section class="data-common-sec short-sec">抢断</section>
                                <section class="data-common-sec short-sec">盖帽</section>
                            </div>
                           <div 
                                class="data-common-div"
                                v-for="(item,index) in cjData"
                                :key="item+index"
                            >
                                <section class="data-common-sec long-sec">{{syData[index].season}}</section>
                                <section class="data-common-sec short-sec">{{handleQd(syData[index].preTeam)}}</section>
                                <section class="data-common-sec short-sec">{{item.points}}</section>
                                <section class="data-common-sec short-sec">{{item.reb}}</section>
                                <section class="data-common-sec short-sec">{{item.assist}}</section>
                                <section class="data-common-sec short-sec">{{item.steal}}</section>
                                <section class="data-common-sec short-sec">{{item.block}}</section>
                            </div>
                        </van-tab>
                    </van-tabs>
                </div>
            </van-tab>
            <van-tab title="生涯荣誉">
                <section
                    class="honor-sec"
                    v-for="(item,index) in ryArr"
                    :key="index"
                >{{item.honor}}</section>
                <P class="no-honor-p" v-if="ryArr.length == 0">暂未获取荣耀</P>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import MyHead from "@/components/head.vue";
import {getPlayerBySearch,getPlayerInfor,updateAndGetPlayer} from '@/api/myapi';
import {handleTeam} from '@/utils/handleTeam'
export default {
    name : 'playerInfor',
    components:{MyHead},
    data(){
        return {
            title : '',
            pid : '',
            team : '',
            gzbt :'关注',
            isAtt :false,
            baseInfor : '',
            isLoad :false,
            nrIndex : 0,
            syData : [],
            cjData : [],
            ryArr : []
        }
    },
    beforeRouteEnter (to, from, next) {
        // console.log(to);
        next(vm =>{
            vm.title = vm.$route.query.xx.player
            let pid = vm.$route.query.xx.pid;
            let _isGz = vm.$route.query.xx.isGz;
            vm.pid = pid;
            if(_isGz){
                vm.GzCzPlayer(pid);
            }
            vm.handleQy(pid)
            vm.reqInfor(pid)
        })
    },
    beforeRouteLeave (to, from, next) {
        this.isLoad = false;
        next()
    },
    inject:['getTeamName'],
    methods: {
        gzClick(){
            if(this.$store.state.isLogin){
                this.GzCzPlayer(this.pid)
                // if(this.gzbt == '已关注'){

                //     this.gzbt = "关注";
                //     this.isAtt = false;
                // }else{
                //     this.gzbt = "已关注";
                //     this.isAtt = true;
                // }
            }else{
                this.$router.push({
                    name : 'user',
                    query:{
                        flag : true
                    }
                })
            }
        },
        // 获取球员信息
        reqInfor(xx){
            getPlayerInfor(xx).then(data=>{
                this.baseInfor = data.data.info[0][0];
                this.syData = data.data.info[1];
                this.handleData(this.syData)
                this.ryArr = data.data.info[2];
                this.isLoad = true;
            }).catch(err=>{console.log(err);})
        },
        // 处理数据
        handleData(arr){
            let _result = [];
            for(let i = 0; i < arr.length;i++){
                let _arr = arr[i].aveData.split(/['篮板','助攻','抢断','盖帽','分']/);
                _result.push({
                    reb : _arr[0],
                    assist : _arr[2],
                    steal : _arr[4],
                    block : _arr[6],
                    points : _arr[8]
                })
            }
            this.cjData = _result;
        },
        // 处理球队
        handleQd(team){
            let qd = handleTeam(team)
            return qd;
        },
        // 处理球员状态
        handleQy(pid){
            let str = this.$store.state.xhqx;
            let _arr = str.split(',');
            if(_arr.indexOf(`${pid}`) != -1){
                this.gzbt = "已关注";
                this.isAtt = true;
            }else{
                this.gzbt = "关注";
                this.isAtt = false;
            }
        },
        // 关注或取消关注
        GzCzPlayer(pid){
            let _str = this.$store.state.xhqx;
            let _arr = _str.split(',');
            let _index = _arr.indexOf(`${pid}`)
            if(_index != -1){    //取消关注
                this.$dialog.confirm({
                    title: '提示',
                    message: '确认取消关注该球员吗？'
                }).then(() => {
                    _arr.splice(_index,1);
                    updateAndGetPlayer(this.$store.state.user,_arr).then(res=>{
                        if(res.data.success){
                            let _str1 = '';
                            for(let i = 0 ; i < _arr.length;i++){
                                if(i != _arr.length-1){
                                    _str1 += `${_arr[i]},`
                                }else{
                                    _str1 += `${_arr[i]}`
                                }
                            }
                            this.$store.commit('changeQx',_str1);
                            this.gzbt = "关注";
                            this.isAtt = false;
                        }
                    }).then(err=>{console.log(err);})
                }).catch(() => {
                    this.$dialog.close();
                });
            } else{
                _arr.push(`${pid}`);
                updateAndGetPlayer(this.$store.state.user,_arr).then(res=>{
                    if(res.data.success){
                        let _str1 = _str + `,${pid}`;
                        this.$store.commit('changeQx',_str1);
                        this.gzbt = "取消关注";
                        this.isAtt = true;
                        this.$toast({
                            type : 'success',
                            message : '关注成功'
                        });
                    }
                }).then(err=>{console.log(err);})
            }
        }
    },
}
</script>
<style lang="scss" >
    .player-infor-div{
        padding-top: 40px;
        position: relative;
        p,div,section,span{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }
        .head-opera-sec{
            padding: 0 5px;
            border: 1px solid #fff;
            height: 25px;
            line-height: 25px;
            color: #fff;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            right: 20px;
            font-size: 14px;
            border-radius: 3px;
            i{
                font-size: 14px;
                margin-left: 3px;
            }
        }
        .bg-span{
            display: block;
            height: 70px;
            background-color: #f25a29;
            margin-bottom: 70px;
        }
        .player-base-infor{
            position: absolute;
            width: 80%;
            left: 50%;
            transform: translateX(-50%);
            top: 50px;
            border-radius: 8px;
            background-color: #fff;
            display: flex;
            align-items: center;
            height: 120px;
            padding-bottom: 20px;
            padding-left: 20px;
            box-shadow: 0 1px 1px rgba(0,0,0,.1);
        }
        .season-data-p{
            position: absolute;
            left: 10px;
            bottom: 5px;
            font-size: 14px;
        }
        .qytx-span{
            display: block;
            width: 100px;
            // height: 100px;
            border: 1px solid #ddd;
            border-radius: 3px;
            img{
                display: block;
                width: 100%;
            }
        }
        .base-infor-div{
            width: 130px;
            margin-left: 30px;
        }
        .base-infor-p{
            font-size: 14px;
            height: 20px;
            line-height: 20px;
        }
        .rookie-p{
            height: 30px;
            line-height: 30px;
            font-size: 16px;
            padding-left: 20px;
        }
        .contract-sec{
            padding:0 10px 0 68px;
            position: relative;
            font-size: 16px;
            width:100%;
            min-height: 30px;
            line-height: 1.5;
            margin-bottom: 15px;
            p{
                position: absolute;
                top: 0px;
                left: 20px;
            }
        }
        .van-tabs__nav--line{
            border-top:0.5px solid rgba(0,0,0,.1);
            border-bottom:  0.5px solid rgba(0,0,0,.1);
        }
        .van-tabs__line{
            bottom: 0;
            background: #f25a29;
        }
        .van-tabs--line{
            padding-top: 44px;
        }
        .van-hairline--top-bottom::after{
            border-width: 0;
        }
        .data-common-div{
            width: 100%;
            height: 35px;
            display: flex;
        }
        .title-div{
            section{
                font-weight: bold;
            }
        }
        .data-common-sec{
            height: 35px;
            line-height: 35px;
            text-align: center;
        }
        .short-sec{
            width: 13%;
        }
        .long-sec{
            width: 22%;
        }
        .honor-sec{
            height: 30px;
            line-height: 30px;
            padding-left: 15px;
            &:nth-of-type(2n){
                background-color: #f5f5f5;
            }
        }
        .sysj-div{
            padding-top: 10px;
            position: relative;
            .van-tabs--card{
                padding-top: 40px;
            }
            .van-tabs__nav{
                margin: 0 auto;
                width: 60%;
            }
            .van-tabs__nav--card .van-tab.van-tab--active{
                color: #fff;
                background: #f25a29;
            }
            .van-tabs__nav--card{
                border: 1px solid #f25a29;
            }
            .van-tabs__nav--card .van-tab{
                color: #f25a29;
            }
        }
        .no-honor-p{
            height: 200px;
            line-height: 200px;
            font-size: 20px;
            text-align: center;
        }
        .van-tabs__content{
            .van-ellipsis{
                height: 100%;
                line-height: .8rem;
            }
        }

    }
</style>

