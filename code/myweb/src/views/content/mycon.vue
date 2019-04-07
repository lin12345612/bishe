<template>
    <div class="my-con"> 
        <middle-con></middle-con>
        <side-con :posi="pl" :flag=0 ></side-con>
        <side-con :posi="pr" :flag=1></side-con>
    </div>
</template>
<script>
import middleCon from './childcon/middle'; 
import sideCon from './childcon/myside';
export default {
    name : 'mycontent',
    data(){
        return {
            pl : 'left:0',
            pr : 'right:0'
        }
    },
    components:{middleCon,sideCon}
}
</script>
<style lang="scss" scope>
    .my-con{
        width: 100%;
        position: relative;
        min-height: 650px;
        padding: 30px 0;
    }
</style>