<template>
    <div class="player-select-div">
        <!-- 头部 -->
        <div class="player-head-div">
            <section class="player-opt-sec left-sec" @click="changeOpt(0)" :class="{'curr-opt':currIndex == 0}" >
                <span class="cover-span left-span"></span>
                <p class="player-opt-p">选择球员</p>
            </section>
            <section class="player-opt-sec right-sec" @click="changeOpt(1)" :class="{'curr-opt':currIndex == 1}">
                <span class="cover-span right-span"></span>
                <p class="player-opt-p">搜索球员</p>
            </section>
        </div>
        <!-- 内容部分 -->
        <div class="player-cont-div">
            <div class="player-filter-div team-sel-div" :class="{'set-color':chosenTeam =='请选择球队'}" v-show="currIndex == 0">
                {{chosenTeam}}
                <section @click="showPop" class="trigger-sec">选择球队<i class="myweb-icon-youjian"></i></section>
            </div>
            <div class="player-filter-div player-search-div" v-show="currIndex == 1">
                <form action="/">
                    <van-search
                        v-model="qxmz"
                        placeholder="请输入球员名字"
                        :show-action="showAct"
                        @search="onSearch"
                        @blur="toTop"
                        @focus="showCancel"
                    />
                </form>
            </div>
            <p class="recommend-p" v-if="!searched">是不是在找他们</p>
            <div class="player-cover-div">
                <section 
                    class="player-item-sec"
                    v-for="(item,index) in playerArr"
                    :key="index"
                    @click="toInfor(item)"
                >{{item.player}}</section>
                <div class="player-no-result" v-show="playerArr.length == 0">
                    <img src="../../assets/jiong.jpg">
                    <p class="no-result-p">很遗憾，没有找到球员{{qxmz}}</p>
                </div>
            </div>
        </div>
        <van-popup v-model="showPicker" position="bottom">
            <van-picker
                show-toolbar
                :columns="columns"
                @cancel="showPicker = false"
                @confirm="onConfirm"
                @change="changeTeam"
                title="请选择球队"
            />
        </van-popup>
    </div>
</template>
<script>
import {getHotPlayer,getPlayerByTeam,getPlayerBySearch} from '@/api/myapi';
const team = {}
export default {
    name : 'select-player',
    data(){
        return {
            currIndex : 0,
            allTeam :[],
            chosenTeam : '请选择球队',
            showPicker: false,
            qxmz : '',
            showAct:false,
            searched :false,
            playerArr:[]
        }
    },
    created(){
        this.$store.dispatch('actChangePage',3)
        getHotPlayer().then(data=>{
            this.playerArr = data.data.result;
        }).catch(err=>{console.log(err);})
        let arr = this.$store.state.teamArr;
        let westLen = this.$store.state.westLen;
        let arr1 = [];
        let arr2 = [];
        for(let i = 0; i < arr.length;i++){
            this.allTeam.push(arr[i])
            if(i < westLen){
                arr1.push(arr[i].tName)
            }else{
                arr2.push(arr[i].tName)
            }
        }
        team['东部'] = arr2;
        team['西部'] = arr1;
    },
    methods:{
        changeOpt(index){
            this.currIndex = index;
        },
        changeTeam(picker,values){
            picker.setColumnValues(1,team[values[0]])
        },
        onConfirm(value) {
            this.chosenTeam = `${value[1]}队`
            let _tid = null;
            let _at = this.allTeam;
            for(let i = 0 ; i < _at.length;i++){
                if(_at[i].tName === value[1]){
                    _tid = _at[i].tid;
                    break;
                }
            }
            getPlayerByTeam(_tid).then(data=>{
                this.playerArr = data.data.result;
                this.showPicker = false;
                this.searched = true;
            }).catch(err=>{console.log(err);})
        },
        showPop(){
            this.showPicker = true;
        },
        onSearch(){
            if(this.qxmz != ''){
                getPlayerBySearch(this.qxmz).then(data =>{
                    this.searched = true;
                    this.playerArr = data.data.info;
                    this.qxmz = '';
                }).catch(err=>{console.log(err);})
            }
        },
        toTop(){
            this.backTop();
            this.showAct = false;
        },
        showCancel(){
            this.showAct = true;
        },
        toInfor(item){
            this.$router.push({
                name:'playerInfor',
                query:{
                    xx : item
                }
            })
        }
    },
    inject:['backTop'],
    computed:{
        columns(){
            console.log(team['东部']);
            let opt = [
                {
                    values : Object.keys(team),
                    className :''
                },
                {
                    values:team['东部'],
                    defaultIndex :0
                }
            ]
            return opt
        }
    }
}
</script>

<style lang="scss">
    .player-select-div{
        padding: 10px 0;
        position: relative;
        p,section,div,span{
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        .player-head-div{
            height: 30px;
            width: 90%;
            margin: 0 auto;
            border: 1px solid #f25a29;
            position: relative;
        }
        .player-opt-sec{
            position: absolute;
            top: 0.5px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            overflow: hidden;
            transition: width .5s linear;
            cursor: pointer;
        }
        .left-sec{
            left: 0px;
            width: 35%;
            background: #f5f5f5;
            .player-opt-p{
                left: 50%;
                transform: translateX(-50%);
            }
            z-index: 66;
        }
        .right-sec{
            right: 0;
            width: 35%;
            .player-opt-p{
                right: 50%;
                transform: translateX(50%);
            }
        }
        .player-opt-p{
            position: absolute;
            height: 30px;
            line-height: 30px;
            top: 0;
            white-space: nowrap;
        }
        .cover-span{
            display: none;
            width:30px;
            height: 30px;
            position: absolute;
            // border: 1px solid #f25a29;
            // background-color: #f25a29;
            background: #f5f5f5;
            top: 0;
            transform: rotate(-45deg);
        }
        .left-span{
            right: -21px;
        }
        .right-span{
            left: -21px;
        }
        .curr-opt{
            width: 65%;
            background: #f25a29;
            color: #fff;
            .cover-span{
                display: block;
            }
        }
        .player-cont-div{
            padding: 50px 10px 10px;
            position: relative;
        }
        .player-filter-div{
            position: absolute;
            top: 10px;
            left: 0;
            width: 100%;
            height: 40px;
            background-color: #fff;
        }
        .team-sel-div{
            padding: 0 20px;
            line-height: 40px;
            font-size: 16px;
        }
        .trigger-sec{
            position: absolute;
            top:0;
            right: 20px;
            height: 40px;
            cursor: pointer;
            color: #333;
            i{
                margin-left: 5px;
            }
        }
        .set-color{
            color: #999;
        }
        .van-picker__toolbar{
            padding: 0 15px;
        }
        .player-search-div{
            padding: 0 10px;
            line-height: 40px;
        }
        form{
            height: 100%;
        }
        .van-search{
            height: 100%;
            padding: 5px 0;
        }
        .van-search__action{
            margin-left: 5px;
        }
        .van-search__content{
            height: 100%;
            padding-left:5px; 
        }
        .van-field__body{
            height: 100%;
            padding-left: 5px;
        }
        .van-field__left-icon{
            padding-top: 2px;
            .van-icon{
                line-height: 1.1;
            }
        }
        .recommend-p{
            font-size: 16px;
            padding: 15px 0 0 15px;
        }
        .player-cover-div{
            display: flex;
            // justify-content: space-around;
            flex-wrap: wrap;
            padding-top: 15px;
        }
        .player-item-sec{
            height: 30px;
            line-height: 30px;
            padding:0 12px;
            border-radius: 15px;
            border:1px solid #f25a29;
            margin-bottom: 12px;
            margin-right: 20px;
            cursor: pointer;
        }
        .player-no-result{
            width: 280px;
            height: 220px;
            margin: 30px auto 0;
            img{
                display: block;
                width: 100%;
            }
        }
        .no-result-p{
            text-align: center;
            font-size: 16px;
            margin-top: 15px;
        }
    }
</style>

