<template>
    <div class="count-outer-div">
        <van-tabs type="card">
            <van-tab title="球队排行">
                <team-rank></team-rank>
            </van-tab>
            <van-tab title="球员数据排行">
                <data-rank></data-rank>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import TeamRank from './teamRank.vue'
import DataRank from './dataRank.vue';
export default {
    name : 'count',
    components:{TeamRank,DataRank}
}
</script>
<style lang="scss">
    .count-outer-div{
        padding: 15px 0;
        position: relative;
        .van-tabs__nav--card{
            border: 1px solid #f25a29;
        }
        .van-tab.van-tab--active{
            background-color: #f25a29;
        }
        .van-tab{
            color: #f25a29;
        }
    }
</style>


