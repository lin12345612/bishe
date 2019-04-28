<template>
    <div class="player-cover-div">
        <xz-player v-if="$store.state.pf"></xz-player>
        <player-xx v-if="!$store.state.pf"></player-xx>
    </div>
</template>
<script>
import xzPlayer from './searchPlayer';
import playerXx from './qyInfor';
export default {
    name : 'player-infor',
    data(){
        return {

        }
    },
    components:{xzPlayer,playerXx}
}
</script>
<style lang="scss">
    .player-cover-div{
        padding:20px;
        min-height: 620px;
    }
    
</style>
