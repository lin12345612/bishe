<template>
  <div class="home">
    <button @click="showbtn1">球队排名测试</button>
    <!-- <button @click="getPic">获取图片</button> -->
    <img  src="../assets/logo.png"/>
    <!-- <img  :src ="mySrc" :show="iflag"/> -->
      <!-- <div v-for="(item,index) in item1">
          <button @click="getshow(index)" :class="{myclass:item.show}" >item</button>
      </div> -->
  </div>
</template>

<script>
import { getTeamRank } from '@/api/myApi'
export default {
  name: "home",
  data(){
    return {
      iflag : false,
      mySrc : '',
      item1 : [
        {
          "val":'111',
          "show":false
        }, {
          "val":'222',
          "show":false
        }, {
          "val":'333',
          "show":false
        }, {
          "val":'444',
          "show":false
        },
      ],
      _index : [0]
    }
  },
  methods: {
    getshow(index){
      // console.log(this.item1[index]);
      this.item1[index].show = true
    },
    getPic(){
          this.iflag = true;
          this.mySrc = 'imges/logo/76ers.png'

    },
    showbtn1(){
      // console.log(getTeamRank);
      getTeamRank()
      .then((res)=>{
        console.log(res.data.info);
      }).catch((err) =>{
        console.log(err);
      })
    }
  },
};
</script>
<style lang="scss">
  .myclass{
    color: red;
  }
</style>