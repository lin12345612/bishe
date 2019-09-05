<template>
    <div class="modifyNc-div">
        <common-head :title="title">
            <button slot="opera" class="saveBtn" :class="{'clickable': nc}" @click="saveNc">保存</button>
        </common-head>
        <input type="text" class="nc-input" v-model="nc" placeholder="请输入昵称">
    </div>
</template>
<script>
import commonHead from '@/components/head'
import {modifyNc} from '@/api/myapi'
export default {
    name : 'modifyNc',
    components:{commonHead},
    data(){
        return {
            title: '修改昵称',
            nc :''
        }
    },
    created(){
        this.nc = this.$store.state.nc
    },
    methods:{
        saveNc(){
            if(this.nc){
                modifyNc(this.$store.state.user,this.nc).then(res=>{
                    if(res.data.success){
                        this.$toast({
                            duration : 1000,
                            message : '昵称修改成功'
                        })
                        this.$store.commit('changeNc',this.nc);
                        setTimeout(()=>{
                            this.$router.go(-1);
                        },1000)
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .modifyNc-div{
        width: 100%;
        height: 100%;
        position: relative;
        padding-top: 50px;
        background-color: #f5f5f5;
        .saveBtn{
            @include set-pt;
            right: 10px;
            color: #fff;
            border: none;
            border-radius: 14px;
            height: 28px;
            width: 60px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            background-color: transparent;
            opacity: .3;
        }
        .nc-input{
            width: 100%;
            height: 44px;
            background-color: #fff;
            padding: 10px 16px;
            border: none;
            box-sizing: border-box;
            font-size: 14px;
        }
        .clickable{
            opacity: .8;
        }
    }
</style>
