<template>
    <div class="count-outer-div" ref="count">
        <van-tabs type="card">
            <van-tab title="球队排行">
                <team-rank></team-rank>
            </van-tab>
            <van-tab title="球员数据排行">
                <data-rank @setPosi="handlePosi" :setTop="st"></data-rank>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import TeamRank from './teamRank.vue'
import DataRank from './dataRank.vue';
export default {
    name : 'count',
    components:{TeamRank,DataRank},
    data(){
        return {
            st : false
        }
    },
    created(){
        this.$store.dispatch('actChangePage',1)
    },
    methods:{
        handlePosi(){
            let _sp = this.$refs.count.scrollTop;
            if(_sp >= 64){
                this.st = true;
            }else{
                this.st = false;
            }

        }
    }
}
</script>
<style lang="scss">
    .count-outer-div{
        padding: 15px 0 40px 0 ;
        position: relative;
        min-height: 100%;
        box-sizing: border-box;
        background-color: #f0f0f0;
        overflow-x:hidden; 
        .van-tabs__nav--card{
            border: 1px solid #f25a29;
        }
        .van-tab.van-tab--active{
            background-color: #f25a29;
        }
        .van-tab{
            color: #f25a29;
            .van-ellipsis{
                height: 100%;
                line-height: 30px;
            }
        }
    }
</style>


