<template>
    <div class="top-div" ref="topDiv">
        <div class="top-input">
            <input type="checkbox" 
                :checked="srArr.length === srAId.length"
                @click="checkAll(title)"
            >{{title}}
        </div>
        <Sc :srArr="srArr" :srAId="srAId" @pushArr="checkyi"></Sc>
        <!-- <button @click="showSt()">点击看看</button> -->
        
    </div>
</template>
<script>
import Fc from './ck1'
import Sc from './ckp'
export default {
    name : 'parent-checkbox',
    data(){
        return {
            srArr :[
                {
                    id : '1',
                    value : '苹果'
                },
                {
                    id : '2',
                    value : '梨'
                },
                {
                    id : '3',
                    value : '桃子'
                }],
            srAId : [],
            ischecked : false
        }
    },
    methods:{
        checkAll(data){
            this.ischecked = !this.ischecked;
            if(this.ischecked){
                this.srAId = [];
                this.srArr.forEach(function(srArr){
                    this.srAId.push(srArr.id)
                },this);
            }else{
                this.srAId = [];
            }
            this.$emit('allin',data);
        },
        showSt(){
            console.log(this.$refs.topDiv.offsetHeight);
        },
        checkyi(data){
            var _index = this.srAId.indexOf(data);
            if(_index >= 0){
                this.srAId.splice(_index,1);
                this.ischecked = false;
            }else{
                this.srAId.push(data);
            }
        }
    },
    props:['title'],
    components:{Fc,Sc}
}
</script>
<style scoped>
    .top-div{
        width: 200px;
        text-align: left;
        /* height: 100px; */
    }
    .top-input{
        width: 100%;
    }
    
</style>


