<template>
    <div>
        <div class="tc-div"
            v-for="(item,index) in arr1"
            :key="index"
        >
            <Tc :title="item" @allin="pushArr2"></Tc>
        </div>
    </div>
</template>
<script>
import Tc from './totalCk'
export default {
    name : 'highest-check',
    data(){
        return {
            arr1 : ['一','二','三'],
            arr2 : []
        }
    },
    methods:{
       pushArr2(data){
           var _in = this.arr2.indexOf(data)
           if(_in >= 0){
               this.arr2.splice(_in,1);
           }else{
               this.arr2.push(data);
           }
           console.log(this.arr2);
       }
    },
    components : {Tc}
}
</script>
<style scoped>
    .tc-div{
        margin-bottom: 20px;
    }
</style>


