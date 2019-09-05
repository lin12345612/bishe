<template>
    <div class="team-rank-div">
        <team-item :title="east" :pmArr="eastArr"></team-item>
        <team-item :title="west" :pmArr="westArr"></team-item>
    </div>
</template>
<script>
import teamItem from './components/teamItem.vue';
export default {
    name : 'teamRank',
    components:{teamItem},
    data(){
        return {
            west : '西部',
            east : '东部',
            eastArr : [],
            westArr :[]
        }
    },
    created(){
        this.initData()
    },
    methods:{
        initData(){
            let arr = this.$store.state.teamArr;
            let len1 = this.$store.state.westLen;
            for(let i = 0; i < arr.length;i++){
                if(i < len1){
                    this.westArr.push(arr[i])
                }else{
                    this.eastArr.push(arr[i])
                }
            }

        }
    }
}
</script>
<style lang="scss" scoped>
    .team-rank-div{
        padding-top: 15px;
    }
</style>
