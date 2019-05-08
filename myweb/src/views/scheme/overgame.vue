<template>
    <div class="overgame-div">
        <p class="overgame-p">{{sj}}</p>
        <div class="select-og-date">
            <el-date-picker
                v-model="time1"
                type="date"
                placeholder="选择比赛日期"
                format="yyyy-MM-dd"
                @change="changeDate"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd">
            </el-date-picker>
        </div>
        <div class="og-cover-div" v-if="og.length && og[0].done == '是' ">
            <section
                v-for="(item,index) in og"
                :key="index"
                class="og-sec"
            >
                <div class="og-team-score-cover">
                    <p>(主) {{item.hTeam}}</p>
                    <p>VS</p>
                    <p>{{item.rTeam}}(客)</p>
                </div>
                <div class="og-team-score-cover">
                    <p class="og-score-p" :class="{'win-p': item.hScore > item.rScore }">{{item.hScore}}</p>
                    <p>:</p>
                    <p class="og-score-p" :class="{'win-p': item.hScore < item.rScore }">{{item.rScore}}</p>
                </div>
                <!-- 各项最高数据 -->
                <div class="count-cover-div">
                    <p class="og-title-p">各队数据最高</p>
                    <div class="each-count-div">
                        <p >{{handleName(item.hpPlayer)}}<br />{{item.hPoint}}</p>
                        <p>得分</p>
                        <p>{{handleName(item.rpPlayer)}}<br />{{item.rPoint}}</p>
                    </div>
                    <div class="each-count-div">
                        <p >{{handleName(item.hrPlayer)}}<br />{{item.hReb}}</p>
                        <p>篮板</p>
                        <p>{{handleName(item.rrPlayer)}}<br />{{item.rReb}}</p>
                    </div>
                    <div class="each-count-div">
                        <p >{{handleName(item.haPlayer)}}<br />{{item.hAssist}}</p>
                        <p>助攻</p>
                        <p>{{handleName(item.raPlayer)}}<br />{{item.rAssist}}</p>
                    </div>
                    <div class="each-count-div">
                        <p >{{handleName(item.hsPlayer)}}<br />{{item.hSteal}}</p>
                        <p>抢断</p>
                        <p>{{handleName(item.rsPlayer)}}<br />{{item.rSteal}}</p>
                    </div>
                    <div class="each-count-div">
                        <p >{{handleName(item.hbPlayer)}}<br />{{item.hBlock}}</p>
                        <p>盖帽</p>
                        <p>{{handleName(item.rbPlayer)}}<br />{{item.rBlock}}</p>
                    </div>
                </div>
                <div class="result-link-div">
                    <a :href="item.newsSrc" target="_blank"><i class="myweb-icon-xinwen1"></i>新闻</a>
                    <a :href="item.dataSrc" target="_blank"><i class="myweb-icon-tongji"></i>数据</a>
                </div>
            </section>
        </div>
        <p v-if="!og.length||og[0].done == '否'" class="og-warm-p">暂无比赛相关结果</p>
    </div>
</template>
<script>
export default {
    name : 'overgame',
    data(){
        return {
            sj : '今日比赛情况',
            time1 : '',
            osj : '',
            pickerOptions:{
                disabledDate(time1) {
                    return time1.getTime() > Date.now();
                }
            }
        }
    },
    created(){
        // console.log(this.$props.og);
    },
    methods:{
        changeDate(){
            if(this.time1){
                this.$emit('overg',this.time1)
                this.sj = this.time1 + '比赛情况'
                this.osj = this.sj;
            }else{
                this.sj = this.osj;
            }
            
        },
        handleName(name){
            var _index = name.lastIndexOf('-');
            return name.substring(_index+1);
        }
    },
    props:['og']
}
</script>

<style lang="scss">
    .overgame-div{
        padding: 10px;
        border: 1px solid #ddd;
        background: #fff;
        position: relative;
    }
    .overgame-p{
        font-size: 20px;
        font-weight: bold;
        height: 32px;
        line-height: 32px;
    }
    .og-cover-div{
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;    justify-content: space-around;
        // justify-content: space-between;
    }
    .og-sec{
        width: 304px;
        min-height: 150px;
        margin-bottom: 15px;
        border:1px solid #ddd;
        position: relative;
        padding: 10px;
        padding-bottom: 0;
    }
    .og-team-score-cover{
        height: 26px;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
        p{
            font-size:16px;
        }
        .og-score-p{
            width: 60px;
            text-align: center;
            font-size: 18px;
            font-weight: bold;
        }
        .win-p{
            color:#a92229;
        }
    }
    .og-title-p{
        height: 30px;
        line-height: 30px;
        border: 1px solid #ddd;
        text-align: center;
    }
    .each-count-div{
        display: flex;
        border-right:1px solid #ddd; 
        p{
            border: 1px solid #ddd;
            border-top: none;
            font-size : 14px;
            height: 46px;
            text-align: center;
            line-height: 1.4;
            border-right: none;
            &:nth-of-type(1){
                padding-top: 5px;
                width: 40%;
            } &:nth-of-type(2){
                width: 20%;
                line-height: 46px;
            }
            &:nth-of-type(3){
                padding-top: 5px;
                width: 40%;
            }
        }
    }
    .result-link-div{
        height: 40px;
        line-height: 40px;
        text-align: center;
        a{
            display: inline-block;
            color: #333;
            &:nth-of-type(2){
                margin-left:20px;
            }
            &:hover{
                color:#f25a29;
            }
        }
    }
    .select-og-date{
        width: 150px;
        position: absolute;
        top: 8px;
        right:90px;
    }
    .og-warm-p{
        height: 200px;
        line-height: 200px;
        font-size: 24px;
        text-align: center;
    }
    
</style>
