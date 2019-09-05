<template>
    <button class="get-code-btn" @click="handleClick" :disabled="isAble">{{text}}</button>
</template>
<script>
export default {
    name : 'getcodebtn',
    props:['ischeck'],
    data(){
        return {
            text : '获取验证码' ,
            isAble :false
        }
    },
    methods:{
        handleClick(){
            if(this.$props.ischeck){
                this.isAble = true
                let _num = 59;
                this.text = `${_num}s后再次获取`
                let timer = setInterval(()=>{
                    _num--;
                    if(_num != 0){
                        this.text = `${_num}s后再次获取`
                    }else {
                        this.text = '未收到？点击获取'
                        this.isAble = false;
                        clearInterval(timer);
                    }
                },1000)
            }
            this.$emit('cfGetCode');
        }
    }
}
</script>
<style lang="scss" scoped>
    .get-code-btn{
        width: 100%;
        height: 40px;
        line-height: 40px;
        background: rgb(242,90,41);
        color:#fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        &:disabled{
            background: rgba(242,90,41,.6);
        }
    }
</style>

