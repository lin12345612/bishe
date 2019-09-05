<template>
    <div class="change-tx-div">
        <common-head :title="title"></common-head>
        <div class="img-cover-div">
            <div class="img-div">
                <img :src="mySrc">
            </div>
            <div class="btn-div">
                <van-uploader :after-read="handleFile" :before-read="beforeRead">
                    <van-button icon="photo" type="primary">上传图片</van-button>
                </van-uploader>
                <van-button icon="passed" type="primary" @click="uploadImg">确定</van-button>
            </div>
        </div>
    </div>
</template>
<script>
import commonHead from '@/components/head'
import {modifyTx} from '@/api/myapi.js'
export default {
    name : 'modifyTx',
    components:{commonHead},
    data(){
        return {
            title :'修改头像',
            mySrc:'',
            ifChange: false,
            file1 :''
        }
    },
    created(){
        this.mySrc = this.$store.state.tx
    },
    methods:{
        handleFile(file){
            this.mySrc = file.content
            this.ifChange = true
            this.file1 = file.file
        },
        beforeRead(file) {
            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                this.$toast('请上传 jpg或png 格式图片');
                return false;
            }
            return true;
        },
        uploadImg(){
            if(this.ifChange){
                let formd = new FormData();
                formd.append('myfile',this.file1);
                formd.append('user',this.$store.state.user);
                modifyTx(formd).then(res=>{
                    if(res.data.success){
                        this.$toast({
                            duration : 1000,
                            message : '头像修改成功'
                        })
                        this.$store.commit('changeTx',this.mySrc);
                        setTimeout(()=>{
                            this.$router.go(-1);
                        },1000)
                    }
                }).catch(err=>{console.log(err);})
            }else{
                this.$toast('请先选择图片')
            }
        }
    }

}
</script>

<style lang="scss" scoped>
    .change-tx-div{
        width: 100%;
        height: 100%;
        position: relative;
        padding-top: 40px;
        box-sizing: border-box;
        div{
            box-sizing: border-box;
        }
        .img-cover-div{
            width: 100%;
            height: 100%;
            padding: 10px;
            box-sizing: border-box;
        }
        .img-div{
            width: 100%;
            min-height: 220px;
            max-height: 300px;
            overflow: hidden;
            img{
                display: block;
                width: 100%;
            }
        }
        .btn-div{
            display: flex;
            justify-content: space-around;
            height:44px;
            margin-top: 20px;
        }
        .common-btn{
            width: 140px;
            height: 35px;
            border-radius: 5px;
            cursor: pointer;
            background-color: #f25a29;
            border: none;
            color: #fff;
        }
        .van-button--normal{
            padding: 0;
            width: 140px;
            border-radius: 5px;
            background: #f25a29;
            border: none;
        }
        .myflie{
            display: none;
        }
    }
</style>

