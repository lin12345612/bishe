<template>
    <div class="my-side" :style="posi">
        <img ref="img" v-show="forShow" class="my-img"/>
    </div>
</template>
<script>
export default {
    name : 'side',
    data(){
        return {
            forShow : false,
            imgArr :['../images/west.jpg','../images/east.jpg'],
            mySrc:''
        }
    },
    mounted() {
        this.loadImg();
    },
    methods: {
        loadImg(){
            var _this = this;
            var _index = this.$props.flag;
            var _url = this.imgArr[_index];
            var image = new Image();
            image.onload = function(){
                _this.$refs.img.src = _url;
                _this.forShow = true;
            }
            image.onerror = function(){
                console.log('图片加载出错');
            }
            image.src = _url;
        }
    },
    props:['posi','flag']
}
</script>
<style lang="scss">
    .my-side{
        width: 200px;
        position: absolute;
        top: 30px;
        z-index: 6;
    }
    .my-img{
        display: block;
        width: 100%;
    }
</style>