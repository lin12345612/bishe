<template>
    <div class="myplayer-div">
        <common-head :title="title" @backBtn="backBtn">
            <p slot="opera" class="mp-opera-p" @click="operaPlayer" v-if="$store.state.xhqx">{{btnText}}</p>
        </common-head>
        <div class="item-cover-div" :class="{'editor-state':btnshow}">
            <section 
                class="item-common-sec"
                v-for="(item,index) in playerArr"
                :key="index"
                @click="linkPlayer(index)"
            >
                <span class="check-span" :class="{'hasChecked-span':item.ischeck}" @click.stop="checkSpan(index)" v-show="btnshow">
                    <van-icon name="checked"  v-show="item.ischeck"/>
                </span>
                <span class="tx-cover-span">
                    <img :src="item.imgSrc" v-if="item.imgSrc" class="tx-img">
                </span>
                <div class="xhplayer-infor-div">
                    <p class="name-p">{{item.player}}</p>
                    <p class="team-p">{{getTeamName(item.tid,false)}}</p>
                </div>
                <span class="icon-span"></span>
            </section>
            <div class="no-result-div" v-if="isNone">
                <span class="no-result-span"></span>
                <p class="no-result-p">还没有选择喜欢的球员，快去关注球员吧~</p>
            </div>
            <button class="cancelgz-btn" :class="{'unclick':ableClick}" v-show="btnshow" @click="cancelPlayer">取消关注</button>
        </div>
        <div class="pop-cover-div" v-if="ispop">
            <div class="pop-warm-dv">
                <p class="yd-p">关注球星，获取球星信息</p>
                <button class="yd-btn" @click="toPlayer">马上关注</button>
                <span class="close-span" @click="closePop"></span>
            </div>
        </div>
    </div>
</template>
<script>
import commonHead from '@/components/user-head';
import {getXhPlayerInfor,updateAndGetPlayer} from '@/api/myapi.js'
export default {
    name : 'myplayer',
    components:{commonHead},
    data(){
        return {
            title: '我喜欢的球员',
            btnText : '编辑',
            ableClick :false,
            btnshow : false,
            playerArr : [],
            isNone : false,
            selectArr :[],
            ispop :false,
            hasChange : false
        }
    },
    beforeRouteEnter (to, from, next) {
      next(vm=>{
          vm.requestData();
      })  
    },
    created(){
        // this.requestData();
        // this.ispop = true;
        // this.isNone = true;
    },
    methods:{
        requestData(){
            if(this.$store.state.xhqx){
                getXhPlayerInfor(this.$store.state.xhqx).then(res=>{
                    this.isNone = false;
                    this.ispop = false;
                    let _arr = res.data.result.map(val=>{
                        val.ischeck = false;
                        return val;
                    })
                    this.playerArr = _arr
                }).catch(err=>{console.log(err);})
            }else{
                this.ispop = true;
                this.isNone = true;
            }
        },
        operaPlayer(){
            if(this.btnText == '编辑'){
                this.btnText = '取消';
                this.btnshow = true;
                this.ableClick = true;
            }else{
                this.btnText = '编辑';
                this.btnshow = false;
                this.ableClick = false;
            }
        },
        checkSpan(index){
            this.playerArr[index].ischeck = !this.playerArr[index].ischeck;
            if(this.playerArr[index].ischeck){
                this.selectArr.push(this.playerArr[index].pid);
                this.ableClick = false;
            }else{
                let _pid = this.playerArr[index].pid;
                let _index = this.selectArr.indexOf(_pid);
                this.selectArr.splice(_index,1);
                if(this.selectArr.length == 0){
                    this.ableClick = true;
                }
            }
            console.log(this.selectArr);
        },
        // 跳转至球员详情页
        linkPlayer(index){
            if(!this.ableClick){
                this.$router.push({
                    name:'playerInfor',
                    query:{
                        xx:{
                            player : this.playerArr[index].player,
                            pid : this.playerArr[index].pid
                        }
                    }
                })
            }
        },
        closePop(){
            this.ispop = false;
        },
        toPlayer(){
            this.$router.push({name : 'player'})
        },
        cancelPlayer(){
            let _arr1 = this.selectArr;
            if(_arr1.length != 0){
                let _arr = this.$store.state.xhqx;
                _arr = _arr.split(',');
                let _str = [];
                if(_arr1.length < _arr.length){
                    for(let i = 0 ; i < _arr.length;i++){
                        for(let j = 0 ; j < _arr1.length;j++){
                            if(_arr[i] == _arr1[j]){
                                break;
                            }
                            if(j == _arr1.length-1){
                                _str.push(_arr[i])
                            }
                        }
                    }
                }else{
                    _str = [];
                }
                updateAndGetPlayer(this.$store.state.user,_str).then(res=>{
                    if(res.data.success){
                        let str1 = '';
                        if(_str.length == 0 ){
                            this.$store.commit('changeQx','')
                        }else{
                            for(let i = 0 ; i < _str.length;i++){
                                if(i != _str.length-1){
                                    str1 += `${_str[i]},`
                                }else{
                                    str1 += `${_str[i]}`
                                }
                            }
                            this.$store.commit('changeQx',str1)
                        }
                        if(res.data.result.length > 0){
                            this.isNone = false;
                            let _arr = res.data.result.map(val=>{
                                val.ischeck = false;
                                return val;
                            })
                            this.playerArr = _arr
                        }else{
                            this.isNone = true;
                            this.playerArr = [];
                        }
                        this.selectArr = [];
                        this.btnshow = false;
                        this.btnText = '编辑'
                    }
                }).catch(err=>{console.log(err);})
            }
        },
        // 回退按钮
        backBtn(){
            this.ableClick =false;
            this.btnshow = false;
            this.isNone = false;
            this.selectArr = [];
            this.ispop  = false
            this.btnText = '编辑';
            this.$router.go(-1);
        }
    },
    inject:['getTeamName']
}
</script>
<style lang="scss">
    .myplayer-div{
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        position: relative;
        padding-top: 60px;
        background-color: #f5f5f5;
        overflow: hidden;
        .mp-opera-p{
            @include set-pt;
            right: 20px;
            color: #fff;
            font-size: 14px;
            cursor: pointer;
            padding: 0;
            margin: 0;
        }
        .unclick{
            opacity: .3;
        }
        .item-cover-div{
            width:100%;
            position: absolute;
            top: 60px;
            left:0px;
            padding: 0px 20px 60px;
            box-sizing: border-box;
        }
        .editor-state{
            left: 40px;
        }
        .item-common-sec{
            width: 100%;
            height: 100px;
            position: relative;
            border-radius: 14px;
            background-color: #fefefe;
            margin-bottom: 20px;
            padding: 20px;
            box-sizing: border-box;
            cursor: pointer;
            display: flex;
        }
        .check-span{
            display: block;
            @include set-pt;
            left: -42px;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            border:1px solid #ddd;
            background-color: #fff;
            cursor: pointer;
        }
        .hasChecked-span{
            border: none;
            i{
                font-size: 24px;
                color: #f25a29;
            }
        }
        .cancelgz-btn{
            position: fixed;
            left: 0;
            bottom: 0;
            border: none;
            width: 100%;
            height: 40px;
            color: #fff;
            background-color: #f25a29;
            cursor: pointer;
        }
        .tx-cover-span{
            display: block;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            overflow: hidden;
            background-color: #eee;
            position: relative;
        }
        .tx-img{
            display: block;
            width: 80px;
            @include set-middle;
        }
        .xhplayer-infor-div{
            // display:
            margin-left: 20px;
            height: 100%;
            p{
                margin: 0;
            }
        }
        .name-p{
            padding: 10px 0;
            font-size: 16px;
            font-weight: bold;
        }
        .team-p{
            font-size: 12px;
            color: rgba(0,0,0,.4)
        }
        .icon-span{
            @include set-pt;
            right: 10px;
            width: 24px;
            height: 24px;
            background: url('../../assets/to.png') no-repeat center center;
            background-size: 100% 100%;
        }
        .no-result-div{
            padding-top: 30px;
        }
        .no-result-span{
            display: block;
            width: 300px;
            height: 200px;
            background-color: #fff;
            border-radius: 5px;
            margin: 0 auto 20px;
            background: url('../../assets/none.png') no-repeat center center;
            background-size: 100% 100%;
        }
        .no-result-p{
            text-align: center;
            font-size: 14px;
        }
        .pop-cover-div{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0,0,0,.3);
            z-index: 111;
        }
        .pop-warm-dv{
            width: 300px;
            height: 180px;
            border-radius: 15px;
            @include set-middle;
            background-color: #fff;
            box-sizing: border-box;
            padding-top: 30px;
        }
        .yd-p{
            font-size: 18px;
            text-align: center;
        }
        .yd-btn{
            width: 240px;
            height: 40px;
            display: block;
            margin: 30px auto 0;
            border: none;
            color: #fff;
            background-color: #f25a29;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
        }
        .close-span{
            display: block;
            @include set-pl;
            bottom: -60px;
            width: 40px;
            height: 40px;
            cursor: pointer;
            background: url('../../assets/close1.png') no-repeat center center;
            background-size: 100% 100%;
            opacity: .7;
        }
    }
</style>