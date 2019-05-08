<template>
    <div class="scheme-div">
        <over-game :og="ogArr" v-if="ft" @overg="handleOverGame"></over-game>
        <come-game :cg="cgArr" v-if="ct" @comeg="handleComeGame"></come-game>
    </div>
</template>
<script>
import OverGame from './overgame';
import ComeGame from './comegame';
import {myload} from '@/utils/loading.js';
import {getScheme}from '@/api/myApi.js';
export default {
    name : 'scheme',
    data(){
        return {
            ogArr :[],  //已完赛的数组
            cgArr : [],  //未完赛的数组
            ft    : false, //判断是否为第一次加载 
            ct    : false 
        }
    },
    created(){
        var _td = new Date();
        var _y = _td.getFullYear() ;
        var _m = _td.getMonth() + 1;
        var _d = _td.getDate();
        var _d1 = _d + 1;
        _y = _y < 10 ? '0' + _y : _y;
        _m = _m < 10 ? '0' + _m : _m;
        _d = _d < 10 ? '0' + _d : _d;
        _d1 = _d1 < 10 ? '0'+_d1 : _d1;

        var _time = `${_y}-${_m}-${_d}`;
        this.handleOverGame(_time,1);

        var _time2 = `${_y}-${_m}-${_d1}`
        this.handleComeGame(_time2,2)
    },
    methods:{
        // 查询已结束的比赛
        handleOverGame(time){
            this.getResult(time,1)
        },
        // 查询未开始的比赛
        handleComeGame(time){
            this.getResult(time,2);
        },
        getResult(time,type){
            var load = myload();
            getScheme(time).then(data=>{

                if(type == 1){
                    this.ogArr = data.data.info;
                    if(!this.ft){
                        this.ft = true;
                    }
                }else{
                    this.cgArr = data.data.info;
                    if(!this.ct){
                        this.ct = true
                    }
                }
                load.close();
            }).catch(error =>console.log(error))
        }
    },
    components:{OverGame,ComeGame}
}
</script>
<style lang="scss">
    .scheme-div{
        padding: 20px;
    }
</style>
