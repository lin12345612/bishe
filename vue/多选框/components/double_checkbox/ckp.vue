<template>
    <div>
        <div 
            v-for="(item,index) in srArr"
            :key="index"
            class="input-check"
            >
            <input type="checkbox" :checked="srAId.indexOf(item.id) >= 0"  @click="checkOne(item.id)">
            {{item.value}}
        </div>
        <!--  -->
    </div>
</template>
<script>
export default {
    name : 'second-checkbox',
    data(){
        return {
            
        }
    },
    methods:{
        checkOne(item){
            this.$emit('pushArr',item);
        }
    },
    props:['srArr','srAId']
}
</script>
<style scoped>
    .input-check{
        display: inline-block;
        margin-right: 10px;
    }
</style>


