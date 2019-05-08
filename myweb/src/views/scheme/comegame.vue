<template>
    <div class="come-game-div">
        <p class="come-game-p">{{wl}}</p>
        <div class="select-og-date">
            <el-date-picker
                v-model="time2"
                type="date"
                placeholder="选择比赛日期"
                format="yyyy-MM-dd"
                @change="selectDate"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd">
            </el-date-picker>
        </div>
        <div class="cg-cover-div" v-if="cg.length">
            <section
                class="cg-sec"
                v-for="(item,index) in cg"
                :key="index"
            >
                <p class="cg-team-a">(主){{item.hTeam}}</p>
                <p class="cg-team-a">(客){{item.rTeam}}</p>
                <a :href="item.newsSrc" target="_blank" class="zb-link-a"><i class="myweb-icon-zb"></i>直播</a>
            </section>
        </div>
        <p class="cg-warm-p" v-if="!cg.length">暂无比赛</p>
    </div>
</template>
<script>
export default {
    name : 'comeGame',
    data(){
        return {
            wl : '明天比赛',
            time2 : '',
            oriT : '',
            pickerOptions:{
                disabledDate(time1) {
                    var _td = new Date();
                    var _y = _td.getFullYear() ;
                    var _m = _td.getMonth() + 1;
                    var _d = _td.getDate()+1;
                    var _time = `${_y}-${_m}-${_d}`
                    var _td1 = new Date(_time).getTime();
                    return time1.getTime() < _td1;
                }
            }
        }
    },
    methods:{
        selectDate(){
            if(this.time2){
                this.wl = this.time2 + '比赛';
                this.oriT = this.wl;
                this.$emit('comeg',this.time2);
            }else{
                this.wl = this.oriT;
            }
        }
    },
    props:['cg']
}
</script>
<style lang="scss">
    .come-game-div{
        margin-top: 20px;
        background-color: #fff;
        border:1px solid #ddd;
        padding: 10px;
        position: relative;
    }
    .come-game-p{
        font-size: 20px;
        font-weight: bold;
        height: 32px;
        line-height: 32px;
    }
    .select-og-date{
        width: 150px;
        position: absolute;
        top: 8px;
        right:90px;
    }
    .cg-cover-div{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        margin-top: 20px;
        padding-bottom: 20px;
        .cg-sec{
            width: 180px;
            min-height: 100px;
            position: relative;
            padding: 10px;
            border:1px solid #ddd;
            border-radius: 3px;
        }
        .cg-team-a{
            height: 40px;
            line-height: 40px;
        }
        .zb-link-a{
            position: absolute;
            top:50%;
            transform: translateY(-50%);
            right: 10px;
            color: #333;
        }
    }
    .cg-warm-p{
        font-size: 24px;
        height: 100px;
        line-height: 100px;
        text-align: center;
    }
</style>
