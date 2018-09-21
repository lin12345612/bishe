<template>
 <div>
  <ul>
   <li>{{'里面的值：'+ msg}}</li>
   <button @click="fn2">里面改变外面</button>
  </ul>
 </div>
</template>
<script>
 export default {
  model: {  
   prop: 'msg',
   event: 'cc'
  },
  props: {
   msg: ''
  },
  methods: {
   fn2 () {
    this.$emit('cc', this.msg+2)
   }
  }
 }
</script>