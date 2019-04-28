<template>
    <div class="dr-div">
        <span 
            class="slide-span left-span"
            @click="delXb"
        >
            <i 
                class="myweb-icon-zuojian"
                :class="{'unable-click':xb == 0}"></i>
        </span>
        <span 
            class="slide-span right-span"
            @click="addXb"
        >
            <i 
                class="myweb-icon-youjian"
                :class="{'unable-click':xb == 3}"></i>
        </span>
        <div class="outer-dr-div">
            <div class="dr-cover-div" v-if="xs" :style="posi">
                <item-Data
                    v-for="(item,index) in titleArr"
                    :key="index"
                    :title="item"
                    :sx="sxArr[index]"
                    :sjData="dataArr[index]"
                    class="item-com"
                ></item-Data>
            </div>
        </div>
    </div>
</template>
<script>
import {myload} from '@/utils/loading';
import {getTopTen} from '@/api/myApi';
import ItemData from './itemData';
export default {
    name : 'data-range',
    created(){
        this.firstLoad()
    },
    data(){
        return {
            xb : 0,
            titleArr : ['得分','篮板','助攻','抢断','盖帽'],
            sxArr : ['points','reb','assist','steal','block'],
            dataArr : [],
            xs : false,
            posi : ''
        }
    },
    methods:{
        delXb(){
            var _xb = this.xb;
            _xb = --_xb < 0 ? 0 : _xb;
            this.xb = _xb;
            this.posi = `transform:translateX(-${_xb*490}px)`
        },
        addXb(){
            var _xb = this.xb;
            _xb = ++_xb > 3 ? 3 : _xb;
            this.xb = _xb;
            this.posi = `transform:translateX(-${_xb*490}px)`
        },
        // 页面刚进来请求数据
        firstLoad(){
            let load = myload();
            getTopTen()
            .then(data => {
                this.dataArr = data.data.info;
                this.xs = true
                load.close()
            })
            .catch(err =>{console.log(err);})
        }
        
    },
    components:{ItemData}

}
</script>
<style lang="scss" scoped>
    .dr-div{
        padding:30px 20px 20px;
        min-height: 100%;
    }
    .outer-dr-div{
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        position: relative;
    }
    .slide-span{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(0,0,0,.1);
        position:absolute;
        top:50%;
        transform: translateY(-50%);
        cursor:pointer;
        z-index: 99;
        line-height: 50px;
        text-align: center;
        &:hover{
          background: rgba(0,0,0,.2);  
        }
        i{
            font-size: 36px;
            color: rgba(242, 90, 41,.8);
        }
        .unable-click{
            color: rgba(242, 90, 41,.3);
        }
    }
    .left-span{
        left:0px;
    }
    .right-span{
        right:0px;
    }
    .dr-cover-div{
        display: flex;
        width: 2450px;
        transition:transform 0.8s linear;
    }
    .item-com{
        width: 490px;
        padding: 0 10px;
        min-height: 200px;
    }
</style>
