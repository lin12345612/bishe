<template>
    <div class="team-infor">
        <select-page @xzTeam="getMT" v-if="$store.state.tf"></select-page>
        <div class="detail-cover-team" v-if="!$store.state.tf">
            <div class="team-mes">
                <!-- logo部分 -->
                <div class="team-logo-div">
                    <img :src="imgSrc" alt="" v-show="imgShow">
                </div>
                <!-- 中间部分情况介绍 -->
                <div class="team-infor-div">
                    <div class="infor-cover-div">
                        <p class="team-name">队名：{{_team}}</p>
                        <p class="team-name team-normal-p">球馆：{{oinfor.groupName}}</p>
                        <p class="team-name team-normal-p">教练：{{oinfor.coach}}</p>
                    </div>
                    <div class="infor-cover-div">
                        <p class="team-name team-normal-p">战绩：{{oinfor.wNum}}胜/{{oinfor.fNum}}负</p>
                        <p class="team-name team-normal-p">排名：{{_part}}第{{_rank}}</p>
                        <p class="team-name team-normal-p">近况：{{oinfor.states}}</p>
                    </div>
                </div>
                <!-- 选择球队 -->
                <div class="team-des">
                    <el-select v-model="value" placeholder="请选择球队" @change="teamChange">
                        <el-option-group
                            v-for="group in options"
                            :key="group.label"
                            :label="group.label"
                            >
                            <el-option
                                v-for="item in group.options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-option-group>
                    </el-select>
                </div>
            </div>
            <!-- 球队简介 -->
            <div class="team-des-div">
                <p class="team-des-p">{{oinfor.tDes}}</p>
            </div>
            <!-- 球员信息 -->
            <div class="team-player-div">
                <ul class="player-ul">
                    <li
                        v-for="(item,index) in pArr"
                        :key="index"
                        class="player-li"
                    >
                        <section class="player-sec">
                            <div class="number-div side-common-div">{{item.number}}</div>
                            {{item.player}}
                            <div class="img-div side-common-div">
                                <img :src="item.imgSrc" class="player-img">
                            </div>
                        </section>
                    </li>
                </ul>
            </div>
        </div>
    </div >
</template>
<script>
import {getTeamInfor} from '@/api/myApi';
import { myload,imgLoad} from '@/utils/loading';
import SelectPage from './tSelect';
export default {
    name : 'team-infor',
    data(){
        return {
            imgSrc : '',
            pArr   : [],
            oinfor : {},
            imgShow : false,
            _team : '',
            _part : '',
            _rank : '',
            options: [{
                label: '西部',
                options: [{
                    value: '火箭',
                    label: '火箭'
                }, {
                    value: '马刺',
                    label: '马刺'
                }, {
                    value: '鹈鹕',
                    label: '鹈鹕'
                }, {
                    value: '灰熊',
                    label: '灰熊'
                }, {
                    value: '独行侠',
                    label: '独行侠'
                }, {
                    value: '勇士',
                    label: '勇士'
                }, {
                    value: '快船',
                    label: '快船'
                }, {
                    value: '国王',
                    label: '国王'
                }, {
                    value: '湖人',
                    label: '湖人'
                }, {
                    value: '太阳',
                    label: '太阳'
                }, {
                    value: '掘金',
                    label: '掘金'
                }, {
                    value: '开拓者',
                    label: '开拓者'
                }, {
                    value: '雷霆',
                    label: '雷霆'
                }, {
                    value: '爵士',
                    label: '爵士'
                }, {
                    value: '森林狼',
                    label: '森林狼'
                }]
                }, {
                label: '东部',
                options: [{
                    value: '雄鹿',
                    label: '雄鹿'
                }, {
                    value: '猛龙',
                    label: '猛龙'
                }, {
                    value: '76人',
                    label: '76人'
                }, {
                    value: '凯尔特人',
                    label: '凯尔特人'
                }, {
                    value: '篮网',
                    label: '篮网'
                }, {
                    value: '尼克斯',
                    label: '尼克斯'
                }, {
                    value: '热火',
                    label: '热火'
                }, {
                    value: '魔术',
                    label: '魔术'
                }, {
                    value: '黄蜂',
                    label: '黄蜂'
                }, {
                    value: '奇才',
                    label: '奇才'
                }, {
                    value: '老鹰',
                    label: '老鹰'
                }, {
                    value: '步行者',
                    label: '步行者'
                }, {
                    value: '活塞',
                    label: '活塞'
                }, {
                    value: '公牛',
                    label: '公牛'
                }, {
                    value: '骑士',
                    label: '骑士'
                }]
            }],
            value : ''
        }
    },
    created(){
        if(!this.$store.state.tf){     //标志位为false说明不是有导航进入页面
            this.getInfor();
        }
    },
    methods: {
        getInfor(){
            this._team = this.$route.params.team;
            this._part = this.$route.params.title;
            this._rank = this.$route.params.range;
            var loading = myload();
            getTeamInfor(this._team).then((data)=>{
                this.imgSrc = '../../images' + data.data.info[0][0].logoSrc;
                this.pArr = data.data.info[2];
                this.oinfor = data.data.info[1][0];
                imgLoad(this.imgSrc).then(()=>{
                    this.imgShow = true
                }).catch((err) => {
                    console.log(err);
                })

            }).catch((err) =>{
                console.log(err);
            })
            loading.close();
        },
        getPic(url){
            return `../images/tx/${url}`
        },
        teamChange(val){
            let ld1 = myload();
            getTeamInfor(val).then((data)=>{
                this.imgShow = false;
                this._team = val
                this.imgSrc = '../images' + data.data.info[0][0].logoSrc;
                this.pArr = data.data.info[2];
                this.oinfor = data.data.info[1][0];
                this._part = this.oinfor.part
                this._rank = this.oinfor.ranks
                imgLoad(this.imgSrc).then(()=>{
                    this.imgShow = true
                }).catch((err) => {
                    console.log(err);
                })
                ld1.close()
            }).catch((err)=>{
                console.log(err);
            })
        },
        // 选择球队
        getMT(tp){
            let ld2 = myload();
            getTeamInfor(tp.name).then((data)=>{
                this.imgShow = false;
                this._team = tp.name
                this.imgSrc = '../images' + data.data.info[0][0].logoSrc;
                this.pArr = data.data.info[2];
                this.oinfor = data.data.info[1][0];
                this._part = this.oinfor.part
                this._rank = this.oinfor.ranks
                imgLoad(this.imgSrc).then(()=>{
                    this.imgShow = true
                }).catch((err) => {
                    console.log(err);
                })
                ld2.close();
                this.$store.dispatch('actChangeTf',false)
            }).catch((err)=>{
                console.log(err);
            })
        }
    },
    components:{SelectPage}
}
</script>
<style lang="scss" scope>
    div,section,span,p{
        padding:0;
        margin: 0;
        box-sizing: border-box;
    }
    .team-infor{
        width: 100%;
        position: relative;
        padding: 20px;
        
    }
    .team-mes{
        height: 150px;
        display: flex;
        display: -webkit-flex;
        justify-content: space-around;
    }
    .team-logo-div{
        width: 250px;
        height: 150px;
        /* background: red; */
        display: flex;
        display: -webkit-flex;
        align-items: center;
        justify-content: center;
        img{
            display:block;
            width:150px;
            // height:100%;
            margin:0 auto;
        }
    }
    .team-infor-div{
        width: 430px;
        height: 100%;
        position: relative;
        display: flex;
        display: -webkit-flex;
        .infor-cover-div{
            width: 60%;
            height:100%;
            &:nth-of-type(2){
                width:40%;
                padding-left: 20px;
            }
        }
    }
    .team-des{
        width: 300px;
        /* height: 100%; */
        position: relative;
        text-align: center;
    }
    .team-des-div{
        width: 100%;
        padding: 0 30px;
        text-indent: 2rem;
    }
    .team-name{
        font-size: 18px;
        font-weight: 600;
        height:40px;
        line-height: 40px;
        white-space: nowrap;
    }
    .team-normal-p{
        font-weight: 500;
    }
    .des-title-p{
        font-size: 20px;
        text-align: center;
        height: 30px;
        line-height: 30px;
    }
    .team-des-p{
        text-indent: 2rem;
        font-size: 16px;
        text-align: left;
        margin-top: 20px;
        line-height: 1.8;
    }
    .team-player-div{
        padding: 20px;
        margin-top: 15px;
    }
    .player-ul{
        list-style: none;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }
    .player-li{
        width: 33.3%;
        height: 60px;
        margin-bottom: 25px;
        display: flex;
        justify-content: center;
        .player-sec{
            position: relative;
            height: 60px;
            line-height:58px;
            border-top:1px solid rgba(242,90,41,1);
            border-bottom:1px solid rgba(242,90,41,1);
            min-width:210px;
            text-align:center;
            cursor: pointer;
            &:hover{
                background: #fff;
            }
        }
        .side-common-div{
            width: 60px;
            height:60px;
            border-radius:50%;
            border: 1px solid rgba(242,90,41,1);
            position: absolute;
            top: -1px;
        }
        .number-div{
            right:-30px;
            line-height: 60px;
            text-align: center;
            font-size: 20px;
            transform-style: preserve-3d;
            animation :myrotate 1s linear alternate infinite;
        }
        @keyframes myrotate{
            0%{
                transform: rotateY(-90deg)
            }
            50%{
                transform: rotateY(0deg)
            }
            100%{
                transform: rotateY(90deg)
            }
        }
        .img-div{
            left:-30px;
            overflow: hidden;
            background: #fff;    
        }
        .player-img{
            display: block;
            width: 80px;
            // height: 100%;
            margin: 2px 0 0 -10px;
        }
    }
</style>