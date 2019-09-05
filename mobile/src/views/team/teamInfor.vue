<template>
    <div class="team-infor-outer">
        <common-head :title="getTeamName(dm)">
            <section class="head-opera-sec" slot="opera" @click="gzClick">{{gzbt}}<i :class="{'myweb-icon-yx':isAtt,'myweb-icon-wx':!isAtt}"></i></section>
        </common-head>
        <span class="bg-span"></span>
        <div class="team-infor-one" v-if='isLoad'>
            <span class="qd-logo-span"><img :src="logo"/></span>
            <div class="team-infor-des">
                <p><span>战绩：</span>{{qdxx.wNum}}胜/{{qdxx.fNum}}负</p>
                <p><span>排名：</span>{{qdxx.part}}第{{qdxx.ranks}}</p>
                <p><span>近况：</span>{{qdxx.states}}</p>
                <p><span>球馆：</span>{{qdxx.groupName}}</p>
                <p><span>教练：</span>{{qdxx.coach}}</p>
            </div>
        </div>
        <van-tabs v-model="nrIndex" v-if='isLoad' animated>
            <van-tab title="阵容">
                <div class="player-outer-div">
                    <div 
                        class="player-item" 
                        v-for="(item,index) in qyxx"
                        :key="index"
                        @click="toPlayer(item)"
                    >
                        <span class="span-img" >
                            <van-image
                                lazy-load
                                :src="item.imgSrc"
                            />
                        </span>
                        <div class="player-name-div">
                            <svg viewBox="0 0 90 90"> 
                                <path d="M 0,45 a 45,45 0 1,1 0,1 z" id="circle" /> 
                                <text> 
                                    <textPath xlink:href="#circle"> 
                                        {{item.player}}--#{{item.number}}
                                    </textPath> 
                                </text>
                            </svg>
                        </div>
                    </div>
                </div>
            </van-tab>
            <van-tab title="新闻">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
                    <van-cell
                        v-for="(item,index) in qdxw"
                        :key="index"
                        @click="toDetail(item.newSrc)"
                    >
                        {{item.newTitle}}
                    </van-cell>
                </van-list>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import {getTeamInfor,getTeamNews,updateMyteam} from '@/api/myapi';
import {loadImg} from '@/utils/getLogo';
import CommonHead from '@/components/head.vue'
export default {
    name : 'team-infor',
    components:{CommonHead},
    data(){
        return {
            qdxx : {},
            logo : '',
            dm : '',
            gzbt : '关注',
            isAtt : false,
            isLoad : false,
            nrIndex : 0,
            qyxx : [],   //球员信息
            qdxw : [] ,   //球队新闻，
            loading:false,
            finished :false,
            newsPage : 8

        }
    },
    beforeRouteEnter(to,from,next){
        next(vm =>{
            let _dm = to.query.team;
            vm.dm = to.query.team;
            // console.log(vm.dm);
            vm.updateInfor(vm.dm);
            vm.backTop();
            let _str = vm.$store.state.xhqd;
            let _arr = _str.split(',');
            let _gz = to.query.isGz;
            if(_gz){
                vm.GzczTeam(vm.dm)
            }
            if(_arr.includes(_dm)){
                vm.isAtt = true;
                vm.gzbt = '已关注'
            }else{
                vm.isAtt = false;
                vm.gzbt = '关注'
            }
        })
    },
    beforeRouteLeave (to, from, next) {
      this.isLoad = false;
      this.newsPage = 8;
      this.loading = false;
      this.finished = false;
      this.nrIndex = 0; 
      next()
    },
    methods:{
        updateInfor(dm){
            getTeamInfor(dm).then(data=>{
                this.logo = data.data.info[0][0].logoSrc;
                this.qdxx = data.data.info[0][0];
                this.qyxx = data.data.info[1];
                this.qdxw = data.data.info[2];
                this.isLoad = true;
            }).catch(err =>{console.log(err);})
        },
        gzClick(){
            if(this.$store.state.isLogin){    //已登录
                this.GzczTeam(this.dm)
            }else{                          //未登录
                this.$router.push({
                    name : 'user',
                    query:{
                        flag : true
                    }
                })
            }
        },
        // 列表请求新闻
        onLoad(){
            if(this.dm,this.newsPage){
                getTeamNews(this.dm,this.newsPage).then(data=>{
                    this.loading = false
                    if(data.data.result.length < 8){
                        this.finished = true;
                    }
                    this.qdxw.push(...data.data.result)
                    this.newsPage += 8;
                }).catch(err=>{console.log(err);})
            }
        },
        toDetail(url){
            this.$router.push({
                name : 'outLink',
                query:{
                    lj:url
                }
            })
        },
        toPlayer(item){
            this.$router.push({
                name:'playerInfor',
                query:{
                    xx : {
                        player : item.player,
                        pid : item.pid
                    }
                }
            })
        },
        // 关注或取消球队
        GzczTeam(tid){
            let _str = this.$store.state.xhqd;
            let _arr = _str.split(',')
            let _index = _arr.indexOf(tid)
            if(_index != -1){     //取消关注
                this.$dialog.confirm({
                    title: '提示',
                    message: '确认取消关注该球队吗？'
                }).then(() => {
                    _arr.splice(_index,1);
                    updateMyteam(this.$store.state.user,_arr).then(res=>{
                        if(res.data.success){
                            let _str1 = '';
                            for(let i = 0 ; i < _arr.length;i++){
                                if(i != _arr.length-1){
                                    _str1 += `${_arr[i]},`
                                }else{
                                    _str1 += `${_arr[i]}`
                                }
                            }
                            this.$store.commit('changeQd',_str1);
                            this.gzbt = "关注";
                            this.isAtt = false;
                        }
                    }).then(err=>{console.log(err);})
                }).catch(() => {
                    this.$dialog.close();
                });
            }else{
                _arr.push(`${tid}`);
                updateMyteam(this.$store.state.user,_arr).then(res=>{
                    if(res.data.success){
                        let _str1 = _str + `,${tid}`;
                        this.$store.commit('changeQd',_str1);
                        this.gzbt = "取消关注";
                        this.isAtt = true;
                        this.$toast({
                            type : 'success',
                            message : '关注成功'
                        });
                    }
                }).then(err=>{console.log(err);})
                // console.log('进行关注');
            }
        }
    },
    inject:['backTop','getTeamName']
}
</script>
<style lang="scss">
    .team-infor-outer{
        padding-top: 40px;
        p,section,div{
            box-sizing: border-box;
            padding: 0;
            margin: 0;
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
            }
        }
        .bg-span{
            display: block;
            width: 100%;
            height: 70px;
            background-color: #f25a29;
            margin-bottom: 70px;
        }
        .team-infor-one{
            position: absolute;
            width: 90%;
            left: 50%;
            transform: translateX(-50%);
            top: 50px;
            border-radius: 8px;
            background-color: #fff;
            display: flex;
            align-items: center;
            height: 120px;
            padding-left: 20px;
            box-shadow: 0 1px 1px rgba(0,0,0,.1);
            .qd-logo-span{
                display: block;
                position: relative;
                width: 100px;
                height:100px;
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            
        }
        .team-infor-des{
            width: 140px;
            height: 110px;
            position: relative;
            margin-left: 10px;
            padding-top: 5px;
            p{
                height: 20px;
                line-height: 20px;
                font-size: 14px;
                white-space: nowrap;
                position: relative;
                padding-left: 40px;
            }
            span{
                position: absolute;
                top: 0;
                left: 0;
            }
        }
        .van-tabs__nav--line{
            border-top:1px solid #fff;
            border-bottom:  0.5px solid rgba(0,0,0,.1);
        }
        .van-tabs__line{
            bottom: 0;
        }
        .van-tabs--line{
            padding-top: 44px;
        }
        .van-hairline--top-bottom::after{
            border-width: 0;
        }
        .player-outer-div{
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            padding:10px 0;
        }
        .player-item{
            width: 110px;
            height: 110px;
            border: 1px solid #ddd;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            position: relative;
            margin-bottom: 10px;
        }
        .player-name-div{
            width: 85px;
            height: 85px;
            svg{
                display: block;
                overflow: visible;
            }
            path{
                fill: none;
            }
            .textPath{
                font-size: 20px;
            }
            transform: rotate(0deg);
            animation: circle 5s linear infinite;
        }
        .span-img{
            display: block;
            width: 75px;
            height: 75px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            border-radius: 50%;
            border: 1px solid #ddd;
            overflow: hidden;
            img{
                display: block;
                width: 95px;
                margin-left: -10px;
                margin-top: 3px;
            }
        }
        .van-cell__value{
            padding: 8px 10px;
            border-bottom: 1px solid rgba(0,0,0,.1);
            overflow: hidden;
        }
    }
    @keyframes circle {
        0%{
            transform: rotate(0deg)
        }
        100%{
            transform: rotate(360deg)
        }
    }
    
</style>


