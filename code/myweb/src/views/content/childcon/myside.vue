<template>
    <div class="my-side" :style="posi">
        <!-- <img src="../../../assets/west.jpg" v-if="flag" class="my-img"/>-->
        <!-- <img src="../../../assets/east.jpg" v-show="false" class="my-img"/>  -->
        <img ref="img" v-show="forShow" class="my-img"/>
        <!-- <img v-for="(item,index) in imgs" /> -->
    </div>
</template>
<script>
export default {
    name : 'side',
    data(){
        return {
            forShow : false,
            imgArr :['images/west.jpg','images/east.jpg'],
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
            console.log(_index);
            console.log(_url);
            var image = new Image();
            image.onload = function(){
                _this.$refs.img.src = _url;
                // console.log(this.$ref.img);
                _this.forShow = true;
                console.log('我加载好了');
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