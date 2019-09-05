<template>
    <div class="team-select-div">
        <el-select v-model="qd" placeholder="请选择" v-if="done" @change="emitPar">
            <el-option
                v-for="(item,index) in arr"
                :key="index"
                :label="item.label"
                :value="item.value"
            >
            </el-option>
        </el-select>
    </div>
</template>
<script>
export default {
    name : 'teamselect',
    data(){
        return {
            arr : [],
            qd : '',
            done  :false
        }
    },
    mounted(){
        // console.log(99);
        // if(this.$store.state.teamArr.length != 0){
        //     for(var g = 0 ; g < this.$store.state.teamArr.length ; g++){
        //         this.arr.push({
        //             label : this.$store.state.teamArr[g].tName,
        //             value : this.$store.state.teamArr[g].tid
        //         })
        //     }
        //     this.done = true;
        // }
    },
    created(){
        // console.log(99);
        if(this.$store.state.teamArr.length != 0){
            for(var g = 0 ; g < this.$store.state.teamArr.length ; g++){
                this.arr.push({
                    label : this.$store.state.teamArr[g].tName,
                    value : this.$store.state.teamArr[g].tid
                })
            }
            this.done = true;
        }
    },
    computed:{
        getT(){
            return this.$store.state.teamArr;
        }
    },
    methods:{
        emitPar(value){
            this.$emit('teamchange',value);
        }
    },
    // watch:{
    //     getT(newv,oldv){
    //         if(newv.length != 0){
    //             console.log(666);
    //             for(var g = 0 ; g < newv.length ; g++){
    //                 this.arr.push({
    //                     label : newv[g].tName,
    //                     value : newv[g].tid
    //                 })
    //             }
    //             this.done = true;
    //         }
    //     }
    // }
}
</script>
<style lang="scss">
    .team-select-div{
        width: 100%;
        height: 100%;
        position: relative;
    }
</style>