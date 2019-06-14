<template>
  <div class="home">
      <!-- <van-button type="default">默认按钮</van-button> -->
      <van-tree-select
        :items="items"
        :main-active-index="mainActiveIndex"
        @navclick="onNavClick"
      />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data(){
    return{
      items:[
        {
          text:'所有城市'
        },
        {
          text : '广州'
        },
        {
          text : '深圳'
        },
        {
          text : '潮州'
        },
        {
          text : '珠海'
        }
      ],
      mainActiveIndex:0

    }
  },
  components: {
    HelloWorld
  },
  methods:{
    onNavClick(index){
      // console.log(index);
      this.mainActiveIndex = index
      this.sh()
    }
  },
  inject:['sh']
}
</script>
<style lang="scss" scoped>
    .home{
      .van-tree-select{
        width: 80px;
        height: 227.5px!important;
        padding: 6px 0;
        overflow: hidden;
      }
      .van-tree-select__nav{
        padding: 10px 0;
      }
      .van-tree-select__nitem{
        height: 43.5px;
      }
    }
</style>

