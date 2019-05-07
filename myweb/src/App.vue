<template>
  <div id="app">
    <el-container>
      <el-header class="outer-head">
        <my-head></my-head>
      </el-header>
      <el-main class="my-main">
        <my-nav></my-nav>
        <my-con></my-con>
      </el-main>
      <data-pop v-if="$store.state.df"></data-pop>
      <login v-if="$store.state.dlFlag"></login>
      <register v-if="$store.state.regiFlag"></register>
    </el-container>
  </div>
</template>
<script>
  import myHead from '@/views/head/myhead';
  import myNav from '@/views/nav/mynav';
  import myCon from '@/views/content/mycon';
  import dataPop from '@/views/dataRange/data-pop.vue';
  import Login from '@/views/login/login.vue';
  import Register from '@/views/login/register.vue';
  export default {
      name : 'app',
      components:{myHead,myNav,myCon,dataPop,Login,Register}
  }
</script>
<style lang="scss">
  div,span,section,p,tr,td,input,a{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  button{
    outline: none;
  }
  a{
    text-decoration: none;
  }
  #app{
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right:0;
  }
  .el-loading-mask{
    z-index: 2300!important;
  }
  #app .my-main{
    padding: 0;
    position: relative;
  }
  .outer-head{
    background: #f25a29;
    position: relative;
    z-index: 99;
  }
</style>
