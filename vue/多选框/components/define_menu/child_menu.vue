<template>
    <div class="cover-div">
        <div 
            v-for="(items,key) in totalArr"
            v-bind:key="key"
            class="input-div"
        >
            <input type="checkbox" name="" v-bind:id="items" v-model="toShow" v-bind:value="items">
            <label :for="items">{{items}}</label>
        </div>
        <button class="sure-btn" @click="sureBtn">确定</button>
       <button @click="closeThis" class="close-btn">取消</button>
    </div>
</template>
<style scoped>
    .cover-div{
        position: absolute;
        top: 0px;
        height: 0px;
        width: 200px;
        height: 100px;
        background: rgba(0, 0, 0, 0.6);
        padding: 20px;
    }
    .input-div{
        float: left;
        margin-right: 10px;
    }
    label{
        color: #fff;
    }
    .close-btn{
        position: absolute;
        bottom: 10px;
        right : 30px;
        padding: 10px 20px;
        border: none;
        background: #ddd;
    }
    .sure-btn{
        position: absolute;
        bottom: 10px;
        left: 30px;
        padding: 10px 20px;
        background: lightblue;
        border: none;
    }
</style>

<script>
import vue from 'vue';
import {mapGetters,mapActions} from 'vuex';
export default {
    data(){
        return {
            totalArr : ['一','二','三','四']
        }
    },
    methods : {
        closeThis : function(){
            this.$emit('close');
        },
        sureBtn : function(){
            console.log(this.toShow.length);
        },
        // ...mapActions(['changeMsg'])
    },
    computed:{
        toShow : {
            get(){
                return  this.$store.state.msg;
            },
            set(val){
                this.$store.commit('mutationsMsg',val);
            }
        }
    }
}
</script>

