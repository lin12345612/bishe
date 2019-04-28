<template>
    <div class="my-range">
        <e-range :title="etitle" :dataArr="dataArr[1]" v-if="forShow"></e-range>
        <w-range :title="wtitle" :dataArr="dataArr[0]" v-if="forShow"></w-range>
    </div>
</template>
<script>
import ERange from './trange';
import WRange from './trange';
import { getTeamRank } from '@/api/myApi';
import { myload} from '@/utils/loading';
export default {
    name : 'range',
    data(){
        return {
            etitle:'东部',
            wtitle:'西部',
            dataArr :[],
            forShow:false
        }
    },
    created() {
        this.$store.dispatch('actChangeMf',0);
        this.getRangeData()
    },
    methods: {
       getRangeData(){
            const loading = myload();
            getTeamRank()
            .then((data)=>{
                data.data.info.forEach(element => {
                    this.dataArr.push(element)
                });
                this.forShow = true
            })
            .catch(err=>{
                console.log('数据传输出错了');
            });
            loading.close()
        }
    },
    components:{ERange,WRange}
}
</script>
<style lang="scss" scope>
    .my-range{
        display: flex;
        justify-content: space-around;
        padding-top: 20px;
    }
</style>