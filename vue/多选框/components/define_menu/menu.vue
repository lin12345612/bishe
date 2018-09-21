<template>
    <div class="total-par">
        <ul>
            <li 
                v-for="(items,key) in  gettersMsg"
                v-bind:key="key"
                class="menu-li"
                >
                    {{items}}
                </li>
        </ul>
        <p>{{gettersMsg1}}</p>
        <button class="set-btn" @click="handleShow">设置菜单</button>
        <child-menu v-show="innerFlag" @close="Closeself" @changeArr="changeArr"></child-menu>
    </div>
</template>
<style scoped>
    .total-par{
        position: relative;
    }
    ul{
        list-style: none;
    }
    .menu-li{
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        background: #eee;
        margin-bottom: 10px;
        position: relative;
    }
    .set-btn{
        padding: 10px 18px;
        border-radius: 5px;
        background: yellowgreen;
        color: #fff;
        font-size: 18px;
        border: none;
    }
    .check-span{
        display: block;
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
        border: 1px solid #333;
        width: 12px;
        height: 12px;
        cursor: pointer;
        box-sizing: border-box;
    }
    .checked-span{
        background: blue;
        border: none;
    }
    .check-i{
        display: none;
        width: 10px;
        height: 6px;
        background: url('../../assets/images/check0.png') no-repeat center center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    .checked-span .check-i{
        display: block;
    }
</style>

<script>
import Vue from 'vue';
import ChildMenu from './child_menu';
import {mapGetters,mapActions} from 'vuex'
export default {
    data(){
        return {
            innerFlag : false,
            color : 'red',
            temp : []
        }
    },
    computed : {
        ...mapGetters(['gettersMsg','gettersMsg1'])
    },
    methods : {
        handleShow : function(){
            this.innerFlag = true;
            this.changeMsg1(this.gettersMsg);
        },
        Closeself:function(){
            this.innerFlag = false;
        },
        changeArr:function(){

        },
        ...mapActions(['changeMsg1'])
    },
    components :{ChildMenu}
}
</script>
