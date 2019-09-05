<template>
    <div class="team-info-div">
        <team-area :title="east" :tx="eastArr"></team-area>
        <team-area :title="west" :tx="westArr"></team-area>
    </div>
</template>
<script>
import TeamArea from './components/team-area.vue';
export default {
    name : 'teamchose',
    components:{TeamArea},
    data(){
        return {
            west : '西部',
            westArr : [],
            east : '东部',
            eastArr : []

        }
    },
    created(){
        this.$store.dispatch('actChangePage',2)
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
</script>
<style lang="scss">
    .team-info-div{
        p{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        div{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            position: relative;
        }
        section{
            margin: 0;
            padding: 0;
            box-sizing: border;
            position: relative;
        }
    }
</style>


