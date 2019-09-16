<template>
    <div class="count-outer-div">
        <div class="date1-div">
            <el-date-picker
                v-model="date1"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                type="daterange"
                @change="change1"
                :default-value="dft"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
        </div>
    </div>
</template>
<script>
import {recordTime} from '@/utils/utils';
import {getCount} from '@/api/api.js'
export default {
    name : 'count',
    data(){
        return {
            date1 : '',
            dft : ''
        }
    },
    created(){
        let _et = Date.now();
        let _st = _et - 7*24*60*60*1000;
        _et = recordTime(_et);
        _st = recordTime(_st);
        this.dft =_st
        getCount(_st,_et).then(res=>{
            console.log(res.data);
        }).catch(err=>{console.log(err);})
    },
    methods:{
        change1(){
            console.log(this.date1);
        }
    }
}
</script>
<style lang="scss">
    .count-outer-div{
        width: 100%;
        padding: 20px;
        position: relative;
    }
</style>