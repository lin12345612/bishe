<template>
    <div class="personal-div">
        <common-head :title="title"></common-head>
        <div class="item-div" @click="toModifyTx">
            头像
            <span class="img-span">
                <img :src="$store.state.tx">
            </span>
            <i class=" mytri-i van-icon van-icon-arrow"></i>
        </div>
        <van-cell title="昵称"  :value="$store.state.nc" is-link  @click="toModifyNc"/>
        <van-cell title="修改密码" is-link @click="toModifyPsw"/>
    </div>
</template>
<script>
import CommonHead from '../../components/head'
export default {
    name : 'personal',
    components :{CommonHead},
    data(){
        return {
            title : '个人资料',
            yx : 'yyyy'
        }
    },
    methods:{
        toModifyTx(){
            this.$router.push({name : 'modifyTx'})
        },
        toModifyNc(){
            this.$router.push({name : 'modifyNc'})
        },
        toModifyPsw(){
            this.$router.push({name : 'modifyPsw'})
        }
    }
}
</script>

<style lang="scss" scoped>
    .personal-div{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
        padding-top: 50px;
        position: relative;

        .item-div{
            width: 100%;
            box-sizing: border-box;
            position: relative;
            height: 60px;
            line-height: 60px;
            background-color: #fff;
            padding: 0px 15px;
            font-size: 14px;
            &:after{
                display: block;
                content: '';
                position: absolute;
                border-bottom: 1px solid #ebedf0;
                bottom: 0;
                left: 14px;
                right: 0;
                transform: scaleY(.5);
            }
            .mytri-i{
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 15px;
                color: #969799;
                font-size: 16px;
            }
            .img-span{
                display: block;
                width: 45px;
                height: 45px;
                border-radius: 50%;
                background-color: #f5f5f5;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                right: 40px;
                overflow: hidden;
                img{
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .van-cell__value{
                padding-right: 10px;
            }
        }
    }
</style>

