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
    },
    getTeamName(tid,flag=true){
      let arr = this.$store.state.teamArr;
      let str = ''
      for(let i = 0; i < arr.length;i++){
        if(tid == arr[i].tid){
          str = flag ? arr[i].tName :arr[i].fName
          break;
        }
      }
      return str;
    }
  },
  created(){
    this.$router.push({
      name : 'scheme'
    })
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
