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
    </el-container>
  </div>
</template>
<script>
  import myHead from '@/views/head/myhead';
  import myNav from '@/views/nav/mynav';
  import myCon from '@/views/content/mycon';
  export default {
      name : 'app',
      components:{myHead,myNav,myCon}
  }
</script>
<style lang="scss">
  #app{
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right:0;
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
