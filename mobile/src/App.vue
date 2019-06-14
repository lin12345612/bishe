<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {
  name : 'app',
  provide:{
    backTop(){
      var timer = setInterval(function(){
          let _h = document.documentElement.scrollTop || document.body.scrollTop;
          let _speed = Math.floor(-_h/5);
          document.documentElement.scrollTop = document.body.scrollTop = _h+_speed;
          if(_h === 0){
              clearInterval(timer)
          }
      },30)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #333;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

</style>
