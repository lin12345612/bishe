<template>
    <div class="scheme-div">
        <div class="scheme-cover-div" slot="content">
            <van-pull-refresh 
                v-model="isLoading" 
                @refresh="onRefresh"
                loosing-text="释放加载更多"   
                class="my-refresh"
            >
                <section class="game-item-sec"
                    v-for="(item,index) in itemArr"
                    :key="index"
                >
                    <p class="item-date-p">比赛时间：{{handleTime(item.pDate)}}</p>
                    <div class="game-result-div">
                        <section class="item-team-sec">
                            <span class="team-span">
                                <img :src="handleTx(item.hTeam)">
                            </span>
                            <p class="item-team-p">{{item.hTeam}}</p>
                        </section>
                        <section class="item-point-sec">
                            <div class="point-div">
                                <span :class="{'bgco':item.hScore < item.rScore}">{{item.hScore}}</span>
                                :
                                <span :class="{'bgco':item.hScore > item.rScore}">{{item.rScore}}</span>
                            </div>
                            <p class="game-done-p">(已结束)</p>
                        </section>
                        <section class="item-team-sec">
                            <span class="team-span">
                                <img :src="handleTx(item.rTeam)">
                            </span>
                            <p class="item-team-p">{{item.rTeam}}</p>
                        </section>
                    </div>
                    <div class="lj-div">
                        <a @click="toOutLink(item.tjlj)" target="_blank" class="zwlj-a"><i class="myweb-icon-tongji game-icon"></i>数据统计</a>
                        <a @click="toOutLink(item.splj)" target="_blank" class="zwlj-a"><i class="myweb-icon-sp  game-icon"></i>集锦</a>
                    </div>
                </section>
                <p class="game-tx-p">到底了，下拉加载更多</p>
            </van-pull-refresh>
        </div>
    </div>
</template>
<script>
import {getScheme,getRank} from '@/api/myapi.js';
import {handleLogo} from '@/utils/getLogo.js';
export default {
    name :'scheme',
    data(){
        return {
            isLoading:false,
            page:0,    //下拉次数
            itemArr :[]
        }
    },
    created(){
        this.$store.dispatch('actChangePage',0)
        this.initData()
    },
    methods:{
        // 数据初始化
        initData(){
            getScheme(0).then(data=>{
                if(data.status == 200 && data.data.success){
                    let res = data.data.result
                    for(let item of res){
                        this.itemArr.unshift(item)
                    }
                }
            }).catch(err=>{console.log(err);})
            getRank().then(data=>{
                let len1 = data.data.info[0].length
                let arr = [...data.data.info[0],...data.data.info[1]]
                this.$store.dispatch('actStoreTeamArr',arr)
                this.$store.dispatch('actStoreNum',len1)
            }).catch(err=>{console.log(err);})
        },
        // 头像处理
        handleTx(name){
            let _lj = handleLogo(name);
            return _lj;
        },
        onRefresh(){
            let _num = 3*this.page+3;
            this.page++;
            getScheme(_num).then(data=>{
                if(data.status == 200 && data.data.success){
                    let res = data.data.result
                    for(let item of res){
                        this.itemArr.unshift(item)
                    }
                    this.isLoading = false;
                }
            }).catch(err=>{
                this.isLoading = false;
                Toast('数据传输出错，请稍微再试');
            })
        },
        // 跳转到详情页
        toOutLink(lj){
            this.$router.push({
                name : 'outLink',
                query:{
                    lj:lj
                }
            })
        },
        // 处理时间
        handleTime(time){
            let _time = new Date(time);
            let _y = _time.getFullYear();
            let _m = _time.getMonth()+1 
            let _d = _time.getDate() 
            _m = _m < 10 ? '0'+_m : _m
            _d = _d < 10 ? '0'+_d : _d
            return `${_y}-${_m}-${_d}`
        }
    }

}
</script>
<style lang="scss">
    .scheme-div{
        width: 100%;
        height:100%;
        position: relative;
        background-color: #f5f5f5;
        p{
            margin: 0;
        }
        .game-item-sec{
        height: 170px;
        background-color: #fff;
        border-radius: 5px;
        position: relative;
        margin-bottom: 15px;
        box-shadow: 0px 0px 2px rgba(0,0,0,.1);
        .item-date-p{
            height: 40px;
            line-height: 40px;
            text-align: center;
            margin: 0;
            font-size: 16px;
        }
        .game-result-div{
            display: flex;
            height: 80px;
        }
        .item-team-sec{
            width: 35%;
            height: 100%;
            position: relative;
        }
        .team-span{
            display: block;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin: 0 auto;
            overflow: hidden;
            img{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .item-team-p{
            text-align: center;
            font-size: 16px;
            margin: 0;
        }
        .item-point-sec{
            width: 30%;
            height: 100%;
            position: relative;
            box-sizing: border-box;
            padding-top: 30px;
        }
        .point-div{
            display: flex;
            font-size: 22px;
            justify-content: space-around;
        }
        .bgco{
            opacity: .5;
        }
        .game-done-p{
            text-align: center;
            font-size: 16px;
        }
        .lj-div{
            height: 40px;
            display: flex;
            margin-top: 10px;
            border-top: 1px solid #ddd;
            .zwlj-a{
                width: 50%;
                height: 100%;
                line-height: 40px;
                text-align: center;
                color: #333;
                &:nth-of-type(1){
                    border-right: 1px solid #ddd;
                }
            }
            .game-icon{
                margin-right: 5px;
            }
        }
    }
    }
    .scheme-cover-div{
        position: relative;
        height: 100%;
        .van-pull-refresh{
            height: 100%;
            overflow: auto;
            box-sizing: border-box;
        }
        
    }
    .my-refresh{
        .van-pull-refresh__head{
            top: -32px;
        }
        .van-pull-refresh__track{
            min-height: 100%;
            padding: 10px;
            background-color: #f5f5f5;
            box-sizing: border-box;
        }
        .game-tx-p{
            text-align: center;
            height: 20px;
            line-height: 20px;
            font-size: 16px;
        }
    }
    
</style>


